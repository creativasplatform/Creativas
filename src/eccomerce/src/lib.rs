use candid::{CandidType, Decode, Deserialize, Encode};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::hash::Hash;
use serde_derive::Serialize;
use std::collections::HashMap;
use std::{borrow::Cow, cell::RefCell};


type Memory = VirtualMemory<DefaultMemoryImpl>;

const MAX_VALUE_SIZE_ITEM: u32 = 5000;
const MAX_VALUE_SIZE_SHIPPING_CARD: u32 = 5000;
const MAX_VALUE_SIZE_CATEGORY: u32 = 5000;
const MAX_VALUE_SIZE_VEC_STORABLE: u32 = 8000;
const MAX_VALUE_SIZE_BOOL_STORABLE: u32 = 500;
const MAX_VALUE_SIZE_IEM_CARD_NUMBER_STORABLE: u32 = 500;
const MAX_VALUE_SIZE_IEM_CARD_BOOL_STORABLE: u32 = 500;



#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
enum RatingError {
    Alreadyrated,
    InvalidValue,
    UpdateError,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
enum ItemError {
    AlreadyExist,
    ItemNotAllowed,
    NotExist,
    Unauthorized,
    UpdateError,
    NoItemsAssociated,
    InvalidOwner,
    ItemNotFound,
    AlreadyVoted,
    OutOfStock,
}


#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
enum ItemSuccess {
    Created,
    Update,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub enum Rating {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
}

impl Rating {
    pub fn value(&self) -> u8 {
        match self {
            Rating::Zero => 0,
            Rating::One => 1,
            Rating::Two => 2,
            Rating::Three => 3,
            Rating::Four => 4,
            Rating::Five => 5,
        }
    }
    pub fn from_value(value: u64) -> Option<Rating> {
        match value {
            0 => Some(Rating::Zero),
            1 => Some(Rating::One),
            2 => Some(Rating::Two),
            3 => Some(Rating::Three),
            4 => Some(Rating::Four),
            5 => Some(Rating::Five),
            _ => None, // Devuelve None si el valor no es válido
        }
    }
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Review {
    rating: Rating,
    review: String,
    reviewer: String,
}
#[derive(CandidType, Deserialize)]
pub struct CreateReview {
    item_id: u64,
    rating: u64,
    review: String,
}



#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum Category {
    Electronics,
    ClothingShoesAccessories,
    HomeKitchen,
    BeautyPersonalCare,
    Books,
    SportsOutdoor,
    FoodBeverages,
    HomeImprovement,
    Baby,
    PetsAccessories,
    Food
}

impl Category {
    fn from_str(category: &str) -> Option<Self> {
        match category {
            "Electronics" => Some(Category::Electronics),
            "ClothingShoesAccessories" => Some(Category::ClothingShoesAccessories),
            "HomeKitchen" => Some(Category::HomeKitchen),
            "BeautyPersonalCare" => Some(Category::BeautyPersonalCare),
            "Books" => Some(Category::Books),
            "SportsOutdoor" => Some(Category::SportsOutdoor),
            "FoodBeverages" => Some(Category::FoodBeverages),
            "HomeImprovement" => Some(Category::HomeImprovement),
            "Baby" => Some(Category::Baby),
            "PetsAccessories" => Some(Category::PetsAccessories),
            "Food" => Some(Category::Food),
            _ => None,
        }
    }
}

impl Storable for Category {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_CATEGORY,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone)]
struct Item {
    item: String,
    price: u64,
    description: String,
    image: String,
    reviews: Vec<Review>,
    owner: String,
    contract_address: String,
    stock: u64,
    category: Category, // Usa la enumeración Category
}

#[derive(CandidType, Deserialize)]
pub struct CreateItem {
    item: String,
    price: u64,
    description: String,
    image: String,
    contract_address: String,
    stock: u64,
    category: String, // Usa la enumeración Category
}

#[derive(CandidType, Deserialize)]
pub struct UpdateItem {
    price: Option<u64>,
    description: Option<String>,
    image: Option<String>,
    stock: Option<u64>,
}

// Implementación de trait para la serialización y deserialización de Item

impl Storable for Item {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_ITEM,
        is_fixed_size: false,
    };


}

#[derive(CandidType, Deserialize, Clone, Default)]
pub struct VecStorable {
    ids: Vec<u64>,
}
impl Storable for VecStorable {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_VEC_STORABLE,
        is_fixed_size: false,
    };
}


#[derive(CandidType, Deserialize, Clone)]
pub struct Card {
    item_id: u64,
    item: Item,
    amount: u64,
}

impl Storable for Card {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_SHIPPING_CARD,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone)]
pub struct AddItem {
    item: u64,
    amount: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct ShippingCard {
    card: Vec<Card>,
    total_price: u64,
}

impl Storable for ShippingCard {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_SHIPPING_CARD,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone)]
pub struct OwnerItemCardBoolStorable {
    owner: HashMap<u64, BoolStorable>,
}

impl Storable for OwnerItemCardBoolStorable {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_IEM_CARD_BOOL_STORABLE,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone)]
pub struct OwnerItemCardNumberStorable {
    owner: HashMap<u64, u64>,
}

impl Storable for OwnerItemCardNumberStorable {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_IEM_CARD_NUMBER_STORABLE,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
enum UpdateAction {
    Add,
    Remove,
}

impl UpdateAction {
    fn from_str(category: &str) -> Option<Self> {
        match category {
            "Add" => Some(UpdateAction::Add),
            "Remove" => Some(UpdateAction::Remove),

            _ => None,
        }
    }
}

#[derive(Eq, PartialEq, CandidType, Deserialize, Clone, PartialOrd, Ord)]
pub struct BoolStorable {
    bool: bool,
}
impl Storable for BoolStorable {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_BOOL_STORABLE,
        is_fixed_size: false,
    };
}

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
    // Verifica que ninguno de los campos esté vacío
    if item.item.trim().is_empty() || 
       owner.trim().is_empty() ||
       item.description.trim().is_empty() || 
       item.image.trim().is_empty() || 
       item.contract_address.trim().is_empty() || 
       item.category.trim().is_empty() {
        return Err(ItemError::Unauthorized);
    }

    // Verifica que el stock sea al menos 1
    if item.stock < 1 {
        return Err(ItemError::Unauthorized);
    }

    // Convierte el string a un valor de la enumeración Category
    let category = Category::from_str(&item.category).ok_or(ItemError::NotExist)?;
    let id = ID_MANAGER.with(|manager| manager.get_id());

    let value: Item = Item {
        item: item.item,
        price: item.price,
        description: item.description,
        image: item.image,
        reviews: Vec::new(), // Inicializa reviews como un vector vacío
        owner: owner.clone(), // Clona owner aquí
        contract_address: item.contract_address,
        stock: item.stock,
        category, // Usa la categoría convertida aquí
    };

    ITEMS.with(|p| p.borrow_mut().insert(id, value.clone()));

    OWNER_ITEMS.with(|items| {
        let mut items = items.borrow_mut();
        
        if !items.contains_key(&owner) {
            items.insert(owner.clone(), VecStorable { ids: Vec::new() });
        }
        let owner_items = items.get(&owner).unwrap().clone();
        let mut updated_owner_items = owner_items;
        updated_owner_items.ids.push(id);
        items.insert(owner.clone(), updated_owner_items);
    });

    CATEGORY_ITEMS.with(|items| {
        let mut items = items.borrow_mut();
        if !items.contains_key(&category) {
            items.insert(category.clone(), VecStorable { ids: Vec::new() });
        }
        let category_items = items.get(&category).unwrap().clone();
        let mut updated_category_items = category_items;
        updated_category_items.ids.push(id);
        items.insert(category.clone(), updated_category_items);
    });

    Ok(())
}

#[ic_cdk::query]
fn get_items() -> Vec<(u64, Item)> {
    ITEMS.with(|p| {
        p.borrow()
            .iter()
            .map(|(k, v)| (k.clone(), v.clone()))
            .collect()
    })
}

#[ic_cdk::query]
fn get_item(id: u64) -> Result<Item, ItemError> {
    let item_opt = ITEMS.with(|p| p.borrow().get(&id).clone());

    match item_opt {
        Some(item) => Ok(item),
        None => Err(ItemError::NotExist),
    }
}


#[ic_cdk::query]
fn check_if_item_exists(id: u64) -> bool {
    ITEMS.with(|p| p.borrow().contains_key(&id))
}

#[ic_cdk::query]
fn get_item_owner(item_id: u64) -> Result<String, ItemError> {
    let item_opt = ITEMS.with(|p| p.borrow().get(&item_id));
    match item_opt {
        Some(item) => Ok(item.owner.clone()),
        None => Err(ItemError::NotExist),
    }
}

#[ic_cdk::query]
fn get_items_owner(owner: String) -> Result<Vec<(u64, Item)>, ItemError> {

    let item_ids = OWNER_ITEMS.with(|items| {
        items
            .borrow()
            .get(&owner)
            .unwrap_or_default()
            .ids
            .clone()
    });

    if item_ids.is_empty() {
        return Err(ItemError::NoItemsAssociated);
    }

    let items_owned = ITEMS.with(|items_map| {
        let items_map = items_map.borrow();
        item_ids
            .into_iter()
            .filter_map(|id| items_map.get(&id).map(|item| (id, item.clone())))
            .collect()
    });

    Ok(items_owned)
}



#[ic_cdk::query]
fn get_items_by_category(category: String) -> Result<Vec<(u64, Item)>, ItemError> {
    let category = Category::from_str(&category).ok_or(ItemError::NotExist)?;

    let item_ids = CATEGORY_ITEMS.with(|items| {
        items
            .borrow()
            .get(&category)
            .unwrap_or_default()
            .ids
            .clone()
    });

    if item_ids.is_empty() {
        return Err(ItemError::NoItemsAssociated);
    }

    let items_in_category = ITEMS.with(|items_map| {
        let items_map = items_map.borrow();
        item_ids
            .into_iter()
            .filter_map(|id| items_map.get(&id).map(|item| (id, item.clone())))
            .collect()
    });

    Ok(items_in_category)
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
            if let Some(user_index_map) = OWNER_ITEM_INDEX.with(|c| c.borrow().get(&owner_clone_for_item_in_cart).clone()) {
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
fn update_item_card(update_item: AddItem, action_str: String, user: String) -> Result<(), ItemError> {

    let item_id = update_item.item;
    let amount = update_item.amount;

    let action = UpdateAction::from_str(&action_str).ok_or(ItemError::NotExist)?;

    // Obtén el item
    let item = get_item(item_id)?;


    OWNER_SHIPPING_CARD.with(|c| {
        let mut c = c.borrow_mut();
        if let Some(shipping_card) = c.get(&user) {
            let mut updated_shipping_card = shipping_card.clone();
            if let Some(user_index_map) =
                OWNER_ITEM_INDEX.with(|c| c.borrow().get(&user).clone())
            {
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
        if let Some(user_index_map) =
            OWNER_ITEM_INDEX.with(|c| c.borrow().get(&user).clone())
        {
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
            c.borrow_mut()
                .insert(user.clone(), new_user_cart_map);
        });
    }
    if let Some(new_user_index_map) = new_user_index_map {
        OWNER_ITEM_INDEX.with(|c| {
            c.borrow_mut()
                .insert(user.clone(), new_user_index_map);
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
            c.borrow_mut()
                .insert(user.clone(), new_user_cart_map);
        });
    }
    if let Some(new_user_index_map) = new_user_index_map {
        OWNER_ITEM_INDEX.with(|c| {
            c.borrow_mut()
                .insert(user.clone(), new_user_index_map);
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
