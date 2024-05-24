use crate::get_item;
use crate::types::item::ItemError;
use crate::types::shipping::{AddItem, Card, ShippingCard, UpdateAction};
use crate::types::storable::{
    BoolStorable, OwnerItemCardBoolStorable, OwnerItemCardNumberStorable,
};
use crate::{OWNER_ITEM_INDEX, OWNER_ITEM_IN_CART, OWNER_SHIPPING_CARD};
use std::collections::HashMap;

pub fn add_item_card_logic(add_item: AddItem, owner: String) -> Result<(), ItemError> {
    let item_id = add_item.item;
    let amount = add_item.amount;

    let item = get_item(item_id)?;

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
        if item_in_cart_logic(owner_clone_for_item_in_cart.clone(), item_id) {
            if let Some(user_index_map) =
                OWNER_ITEM_INDEX.with(|c| c.borrow().get(&owner_clone_for_item_in_cart).clone())
            {
                if let Some(index) = user_index_map.owner.get(&item_id) {
                    updated_shipping_card.card[*index as usize].amount += amount;
                    updated_shipping_card.total_price += item.price * amount;
                }
            }
        } else {
            let card = Card {
                item_id,
                item: item.clone(),
                amount,
            };
            updated_shipping_card.card.push(card);
            updated_shipping_card.total_price += item.price * amount;
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

pub fn item_in_cart_logic(user: String, item_id: u64) -> bool {
    OWNER_ITEM_IN_CART.with(|c| {
        if let Some(user_cart_map) = c.borrow().get(&user) {
            user_cart_map.owner.contains_key(&item_id)
        } else {
            false
        }
    })
}

pub fn update_item_card_logic(
    update_item: AddItem,
    action_str: String,
    user: String,
) -> Result<(), ItemError> {
    let item_id = update_item.item;
    let amount = update_item.amount;

    let action = UpdateAction::from_str(&action_str).ok_or(ItemError::NotExist)?;

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
                        }
                        UpdateAction::Remove => {
                            if updated_shipping_card.card[*index as usize].amount < amount {
                                updated_shipping_card.total_price -=
                                    item.price * updated_shipping_card.card[*index as usize].amount;
                                updated_shipping_card.card[*index as usize].amount = 0;
                            } else {
                                updated_shipping_card.card[*index as usize].amount -= amount;
                                updated_shipping_card.total_price -= item.price * amount;
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

pub fn get_user_cart_logic(user: String) -> Result<ShippingCard, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card),
        None => Err(ItemError::NotExist),
    }
}

pub fn get_total_items_in_cart_logic(user: String) -> Result<u64, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card.card.len() as u64),
        None => Err(ItemError::NotExist),
    }
}

pub fn remove_item_from_cart_logic(item_id: u64, user: String) -> Result<(), ItemError> {
    if !item_in_cart_logic(user.clone(), item_id) {
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
                        * updated_shipping_card.card[*index as usize].amount;
                updated_shipping_card.card[*index as usize].amount = 0;
            }
        }
        updated_shipping_card
            .card
            .retain(|card| card.item_id != item_id);
        c.insert(user.clone(), updated_shipping_card);
    });

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

pub fn clear_cart_logic(user: String) -> Result<(), ItemError> {
    if !OWNER_SHIPPING_CARD.with(|c| c.borrow().contains_key(&user)) {
        return Err(ItemError::NotExist);
    }

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

pub fn get_total_price_logic(user: String) -> Result<u64, ItemError> {
    let shipping_card_opt = OWNER_SHIPPING_CARD.with(|c| c.borrow().get(&user).clone());

    match shipping_card_opt {
        Some(shipping_card) => Ok(shipping_card.total_price),
        None => Err(ItemError::NotExist),
    }
}
