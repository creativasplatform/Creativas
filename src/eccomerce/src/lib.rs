// Módulos importados
mod types;
mod operations;
use crate::types::category::Category;
use crate::types::item::{CreateItem, Item, ItemError, UpdateItem};
use crate::types::storable::{
    BoolStorable, OwnerItemCardBoolStorable, OwnerItemCardNumberStorable, VecStorable,
};
// use crate::types::review::{Review, CreateReview, Rating, RatingError};
use crate::types::shipping::{AddItem, Card, ShippingCard, UpdateAction};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;
use std::collections::HashMap;

use crate::operations::item::{
    set_item_logic, get_items_logic, get_item_logic, check_if_item_exists_logic,
    get_item_owner_logic, get_items_owner_logic, get_items_by_category_logic,
};

use regex::Regex;

type Memory = VirtualMemory<DefaultMemoryImpl>;

pub struct IDManager {
    next_id: std::cell::Cell<u64>,
}

impl IDManager {
    pub fn new() -> IDManager {
        IDManager {
            next_id: std::cell::Cell::new(1),
        }
    }

    pub fn get_id(&self) -> u64 {
        let mut id = self.next_id.get();
        while check_if_item_exists(id) {
            id += 1;
        }
        self.next_id.set(id + 1);
        id
    }
}

fn is_valid_eth_address(address: &str) -> bool {
    let re = Regex::new(r"^0x[a-fA-F0-9]{40}$").unwrap();
    re.is_match(address)
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static ITEMS: RefCell<StableBTreeMap<u64, Item, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),

    ));

    static OWNER_ITEMS: RefCell<StableBTreeMap<String, VecStorable, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
    ));

    static CATEGORY_ITEMS: RefCell<StableBTreeMap<Category, VecStorable, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))),
    ));

    static OWNER_SHIPPING_CARD: RefCell<StableBTreeMap<String, ShippingCard, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3))),
    ));
    static OWNER_ITEM_IN_CART: RefCell<StableBTreeMap<String, OwnerItemCardBoolStorable, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4))),
    ));

    static OWNER_ITEM_INDEX: RefCell<StableBTreeMap<String, OwnerItemCardNumberStorable, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5))),
    ));

    static ID_MANAGER: IDManager = IDManager::new();
}

#[ic_cdk::update]
fn set_item(owner: String, item: CreateItem) -> Result<(), ItemError> {
    set_item_logic(owner, item)
}

#[ic_cdk::query]
fn get_items() -> Vec<(u64, Item)> {
    get_items_logic()
}

#[ic_cdk::query]
fn get_item(id: u64) -> Result<Item, ItemError> {
    get_item_logic(id)
}

#[ic_cdk::query]
fn check_if_item_exists(id: u64) -> bool {
    check_if_item_exists_logic(id)
}

#[ic_cdk::query]
fn get_item_owner(item_id: u64) -> Result<String, ItemError> {
    get_item_owner_logic(item_id)
}

#[ic_cdk::query]
fn get_items_owner(owner: String) -> Result<Vec<(u64, Item)>, ItemError> {
    get_items_owner_logic(owner)
}

#[ic_cdk::query]
fn get_items_by_category(category: String) -> Result<Vec<(u64, Item)>, ItemError> {
    get_items_by_category_logic(category)
}












#[ic_cdk::update]
fn add_item_card(add_item: AddItem, owner: String) -> Result<(), ItemError> {
    let item_id = add_item.item;
    let amount = add_item.amount;

    // Obtén el item
    let item = get_item(item_id)?;

    // Clona el owner para usarlo en diferentes contextos
    let owner_clone_for_shopping_card = owner.clone();
    let owner_clone_for_item_in_cart = owner.clone();
    let owner_clone_for_owner_item_index = owner.clone();

    OWNER_SHIPPING_CARD.with(|c| {
        let mut c = c.borrow_mut();
        if !c.contains_key(&owner_clone_for_shopping_card) {
            c.insert(
                owner_clone_for_shopping_card.clone(),
                ShippingCard {
                    card: Vec::new(),
                    total_price: 0,
                },
            );
        }
        let shipping_card = c.get(&owner_clone_for_shopping_card).unwrap().clone();
        let mut updated_shipping_card = shipping_card;
        if item_in_cart(owner_clone_for_item_in_cart.clone(), item_id) {
            // Si el item ya está en el carrito, actualiza la cantidad
            if let Some(user_index_map) =
                OWNER_ITEM_INDEX.with(|c| c.borrow().get(&owner_clone_for_item_in_cart).clone())
            {
                if let Some(index) = user_index_map.owner.get(&item_id) {
                    updated_shipping_card.card[*index as usize].amount += amount;
                    updated_shipping_card.total_price += item.price * amount; // Actualiza el precio total
                }
            }
        } else {
            // Si el item no está en el carrito, agrega un nuevo item
            let card = Card {
                item_id,
                item: item.clone(),
                amount,
            };
            updated_shipping_card.card.push(card);
            updated_shipping_card.total_price += item.price * amount; // Actualiza el precio total
            let new_index = (updated_shipping_card.card.len() - 1) as u64;
            OWNER_ITEM_INDEX.with(|c| {
                let mut c = c.borrow_mut();
                if !c.contains_key(&owner_clone_for_owner_item_index) {
                    c.insert(
                        owner_clone_for_owner_item_index.clone(),
                        OwnerItemCardNumberStorable {
                            owner: HashMap::new(),
                        },
                    );
                }
                if let Some(user_index_map) = c.get(&owner_clone_for_owner_item_index).clone() {
                    let mut new_user_index_map = user_index_map.clone();
                    new_user_index_map.owner.insert(item_id, new_index);
                    c.insert(owner_clone_for_owner_item_index.clone(), new_user_index_map);
                }
            });
        }
        c.insert(owner_clone_for_shopping_card, updated_shipping_card);
    });

    // Actualiza OWNER_ITEM_IN_CART
    OWNER_ITEM_IN_CART.with(|c| {
        let mut c = c.borrow_mut();
        if !c.contains_key(&owner) {
            c.insert(
                owner.clone(),
                OwnerItemCardBoolStorable {
                    owner: HashMap::new(),
                },
            );
        }
        if let Some(user_cart_map) = c.get(&owner).clone() {
            let mut new_user_cart_map = user_cart_map.clone();
            new_user_cart_map
                .owner
                .insert(item_id, BoolStorable { bool: true });
            c.insert(owner, new_user_cart_map);
        }
    });

    Ok(())
}

#[ic_cdk::query]
fn item_in_cart(user: String, item_id: u64) -> bool {
    OWNER_ITEM_IN_CART.with(|c| {
        if let Some(user_cart_map) = c.borrow().get(&user) {
            user_cart_map.owner.contains_key(&item_id)
        } else {
            false
        }
    })
}

#[ic_cdk::update]
fn update_item_card(
    update_item: AddItem,
    action_str: String,
    user: String,
) -> Result<(), ItemError> {
    let item_id = update_item.item;
    let amount = update_item.amount;

    let action = UpdateAction::from_str(&action_str).ok_or(ItemError::NotExist)?;

    // Obtén el item
    let item = get_item(item_id)?;

    OWNER_SHIPPING_CARD.with(|c| {
        let mut c = c.borrow_mut();
        if let Some(shipping_card) = c.get(&user) {
            let mut updated_shipping_card = shipping_card.clone();
            if let Some(user_index_map) = OWNER_ITEM_INDEX.with(|c| c.borrow().get(&user).clone()) {
                if let Some(index) = user_index_map.owner.get(&item_id) {
                    match action {
                        UpdateAction::Add => {
                            updated_shipping_card.card[*index as usize].amount += amount;
                            updated_shipping_card.total_price += item.price * amount;
                            // Actualiza el precio total
                        }
                        UpdateAction::Remove => {
                            // Verifica si la cantidad a restar es menor que la cantidad total del item en el carrito
                            if updated_shipping_card.card[*index as usize].amount < amount {
                                updated_shipping_card.card[*index as usize].amount = 0;
                                updated_shipping_card.total_price -=
                                    item.price * updated_shipping_card.card[*index as usize].amount;
                            // Actualiza el precio total
                            } else {
                                updated_shipping_card.card[*index as usize].amount -= amount;
                                updated_shipping_card.total_price -= item.price * amount;
                                // Actualiza el precio total
                            }
                        }
                    }
                    c.insert(user, updated_shipping_card);
                    Ok(())
                } else {
                    Err(ItemError::NotExist)
                }
            } else {
                Err(ItemError::NotExist)
            }
        } else {
            Err(ItemError::NotExist)
        }
    })
}

#[ic_cdk::query]
fn get_user_cart(user: String) -> Result<ShippingCard, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card),
        None => Err(ItemError::NotExist),
    }
}

#[ic_cdk::query]
fn get_total_items_in_cart(user: String) -> Result<u64, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card.card.len() as u64),
        None => Err(ItemError::NotExist),
    }
}

#[ic_cdk::update]
fn remove_item_from_cart(item_id: u64, user: String) -> Result<(), ItemError> {
    // Verifica si el item no está en el carrito
    if !item_in_cart(user.clone(), item_id) {
        return Err(ItemError::NotExist);
    }

    OWNER_SHIPPING_CARD.with(|c| {
        let mut c = c.borrow_mut();
        let shipping_card = c.get(&user).unwrap().clone();
        let mut updated_shipping_card = shipping_card;
        if let Some(user_index_map) = OWNER_ITEM_INDEX.with(|c| c.borrow().get(&user).clone()) {
            if let Some(index) = user_index_map.owner.get(&item_id) {
                updated_shipping_card.total_price -=
                    updated_shipping_card.card[*index as usize].item.price
                        * updated_shipping_card.card[*index as usize].amount; // Actualiza el precio total
                updated_shipping_card.card[*index as usize].amount = 0;
            }
        }
        updated_shipping_card
            .card
            .retain(|card| card.item_id != item_id);
        c.insert(user.clone(), updated_shipping_card);
    });

    // Prepara los nuevos mapas para OWNER_ITEM_IN_CART y OWNER_ITEM_INDEX
    let (new_user_cart_map, new_user_index_map) = OWNER_ITEM_IN_CART.with(|c| {
        if let Some(user_cart_map) = c.borrow().get(&user).clone() {
            let mut new_user_cart_map = user_cart_map.clone();
            new_user_cart_map.owner.remove(&item_id);
            let new_user_index_map = OWNER_ITEM_INDEX.with(|c| {
                if let Some(user_index_map) = c.borrow().get(&user).clone() {
                    let mut new_user_index_map = user_index_map.clone();
                    new_user_index_map.owner.remove(&item_id);
                    new_user_index_map
                } else {
                    OwnerItemCardNumberStorable {
                        owner: HashMap::new(),
                    }
                }
            });
            (Some(new_user_cart_map), Some(new_user_index_map))
        } else {
            (None, None)
        }
    });

    // Actualiza OWNER_ITEM_IN_CART y OWNER_ITEM_INDEX
    if let Some(new_user_cart_map) = new_user_cart_map {
        OWNER_ITEM_IN_CART.with(|c| {
            c.borrow_mut().insert(user.clone(), new_user_cart_map);
        });
    }
    if let Some(new_user_index_map) = new_user_index_map {
        OWNER_ITEM_INDEX.with(|c| {
            c.borrow_mut().insert(user.clone(), new_user_index_map);
        });
    }

    Ok(())
}

#[ic_cdk::update]
fn clear_cart(user: String) -> Result<(), ItemError> {
    // Verifica si el usuario tiene un carrito
    if !OWNER_SHIPPING_CARD.with(|c| c.borrow().contains_key(&user)) {
        return Err(ItemError::NotExist);
    }

    // Vacía el carrito del usuario
    OWNER_SHIPPING_CARD.with(|c| {
        let mut c = c.borrow_mut();
        c.insert(
            user.clone(),
            ShippingCard {
                card: Vec::new(),
                total_price: 0,
            },
        );
    });

    // Prepara los nuevos mapas para OWNER_ITEM_IN_CART y OWNER_ITEM_INDEX
    let (new_user_cart_map, new_user_index_map) = OWNER_ITEM_IN_CART.with(|c| {
        if let Some(user_cart_map) = c.borrow().get(&user).clone() {
            let mut new_user_cart_map = user_cart_map.clone();
            new_user_cart_map.owner.clear();
            let new_user_index_map = OWNER_ITEM_INDEX.with(|c| {
                if let Some(user_index_map) = c.borrow().get(&user).clone() {
                    let mut new_user_index_map = user_index_map.clone();
                    new_user_index_map.owner.clear();
                    new_user_index_map
                } else {
                    OwnerItemCardNumberStorable {
                        owner: HashMap::new(),
                    }
                }
            });
            (Some(new_user_cart_map), Some(new_user_index_map))
        } else {
            (None, None)
        }
    });

    // Actualiza OWNER_ITEM_IN_CART y OWNER_ITEM_INDEX
    if let Some(new_user_cart_map) = new_user_cart_map {
        OWNER_ITEM_IN_CART.with(|c| {
            c.borrow_mut().insert(user.clone(), new_user_cart_map);
        });
    }
    if let Some(new_user_index_map) = new_user_index_map {
        OWNER_ITEM_INDEX.with(|c| {
            c.borrow_mut().insert(user.clone(), new_user_index_map);
        });
    }

    Ok(())
}

#[ic_cdk::query]
fn get_total_price(user: String) -> Result<u64, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card.total_price),
        None => Err(ItemError::NotExist),
    }
}
