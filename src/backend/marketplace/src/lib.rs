// Módulos importados
mod types;
mod operations;
use crate::types::category::Category;
use crate::types::item::{CreateItem, Item, ItemError, UpdateItem};
use crate::types::storable::{
 OwnerItemCardBoolStorable, OwnerItemCardNumberStorable, VecStorable,
};
// use crate::types::review::{Review, CreateReview, Rating, RatingError};
use crate::types::shipping::{AddItem, ShippingCard};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;

use crate::operations::item::{
    set_item_logic, get_items_logic, get_item_logic, check_if_item_exists_logic,
    get_item_owner_logic, get_items_owner_logic, get_items_by_category_logic, update_item_logic, remove_item_logic,
};

use crate::operations::card::{
    add_item_card_logic, item_in_cart_logic, update_item_card_logic, get_user_cart_logic,
    get_total_items_in_cart_logic, remove_item_from_cart_logic, clear_cart_logic, get_total_price_logic,
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
fn update_item(id: u64, item: UpdateItem, item_owner: String) -> Result<(), ItemError> {
    update_item_logic(id, item, item_owner)
}

#[ic_cdk::update]
fn remove_item(id: u64, item_owner: String) -> Result<(), ItemError> {
    remove_item_logic(id, item_owner)
}

#[ic_cdk::update]
fn add_item_card(add_item: AddItem, owner: String) -> Result<(), ItemError> {
    add_item_card_logic(add_item, owner)
}

#[ic_cdk::query]
fn item_in_cart(user: String, item_id: u64) -> bool {
    item_in_cart_logic(user, item_id)
}

#[ic_cdk::update]
fn update_item_card(update_item: AddItem, action_str: String, user: String) -> Result<(), ItemError> {
    update_item_card_logic(update_item, action_str, user)
}

#[ic_cdk::query]
fn get_user_cart(user: String) -> Result<ShippingCard, ItemError> {
    get_user_cart_logic(user)
}

#[ic_cdk::query]
fn get_total_items_in_cart(user: String) -> Result<u64, ItemError> {
    get_total_items_in_cart_logic(user)
}

#[ic_cdk::update]
fn remove_item_from_cart(item_id: u64, user: String) -> Result<(), ItemError> {
    remove_item_from_cart_logic(item_id, user)
}

#[ic_cdk::update]
fn clear_cart(user: String) -> Result<(), ItemError> {
    clear_cart_logic(user)
}

#[ic_cdk::query]
fn get_total_price(user: String) -> Result<u64, ItemError> {
    get_total_price_logic(user)
}