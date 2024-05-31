use crate::types::category::Category;
use crate::types::item::{CreateItem, Item, ItemError, UpdateItem};
use crate::types::storable::VecStorable;
use crate::{is_valid_eth_address, CATEGORY_ITEMS, ID_MANAGER, ITEMS, OWNER_ITEMS, SUBCATEGORY_ITEMS};
use std::collections::HashMap;
use core::cell::RefCell;
use crate::SubCategory;

thread_local! {
    static CATEGORY_SUBCATEGORIES: RefCell<HashMap<Category, Vec<&'static str>>> = RefCell::new({
        let mut m = HashMap::new();
        m.insert(Category::Electronics, vec!["Laptops", "Cellphones", "Monitors", "Tvs"]);
        m.insert(Category::Food, vec!["Vegetables", "Fruits", "Meat", "Snacks"]);
        m
    });
}

pub fn is_valid_subcategory(category: Category, subcategory: &str) -> bool {
    CATEGORY_SUBCATEGORIES.with(|map| {
        map.borrow().get(&category).map_or(false, |subcategories| {
            subcategories.contains(&subcategory)
        })
    })
}

pub fn set_item_logic(owner: String, item: CreateItem) -> Result<(), ItemError> {
    if item.item.trim().is_empty()
        || owner.trim().is_empty()
        || item.description.trim().is_empty()
        || item.image.trim().is_empty()
        || item.contract_address.trim().is_empty()
        || item.category.trim().is_empty()
        || item.subcategory.trim().is_empty()
    {
        return Err(ItemError::Unauthorized);
    }

    if !is_valid_eth_address(&owner) {
        return Err(ItemError::Unauthorized);
    }

    if item.stock < 1 {
        return Err(ItemError::Unauthorized);
    }

    let category = Category::from_str(&item.category).ok_or(ItemError::NotExist)?;
    if !is_valid_subcategory(category, &item.subcategory) {
        return Err(ItemError::Invalid);
    }

    let subcategory = SubCategory::new(category, &item.subcategory);
    let id = ID_MANAGER.with(|manager| manager.get_id());

    let value: Item = Item {
        item: item.item,
        price: item.price,
        description: item.description,
        image: item.image,
        reviews: Vec::new(),
        owner: owner.clone(),
        contract_address: item.contract_address,
        stock: item.stock,
        category,
        subcategory: item.subcategory.clone(),
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

    SUBCATEGORY_ITEMS.with(|items| {
        let mut items = items.borrow_mut();
        if !items.contains_key(&subcategory) {
            items.insert(subcategory.clone(), VecStorable { ids: Vec::new() });
        }
        let subcategory_items = items.get(&subcategory).unwrap().clone();
        let mut updated_subcategory_items = subcategory_items;
        updated_subcategory_items.ids.push(id);
        items.insert(subcategory.clone(), updated_subcategory_items);
    });

    Ok(())
}


pub fn get_items_logic() -> Vec<(u64, Item)> {
    ITEMS.with(|p| {
        p.borrow()
            .iter()
            .map(|(k, v)| (k.clone(), v.clone()))
            .collect()
    })
}

pub fn get_item_logic(id: u64) -> Result<Item, ItemError> {
    let item_opt = ITEMS.with(|p| p.borrow().get(&id).clone());

    match item_opt {
        Some(item) => Ok(item),
        None => Err(ItemError::NotExist),
    }
}

pub fn check_if_item_exists_logic(id: u64) -> bool {
    ITEMS.with(|p| p.borrow().contains_key(&id))
}

pub fn get_item_owner_logic(item_id: u64) -> Result<String, ItemError> {
    let item_opt = ITEMS.with(|p| p.borrow().get(&item_id));
    match item_opt {
        Some(item) => Ok(item.owner.clone()),
        None => Err(ItemError::NotExist),
    }
}

pub fn get_items_owner_logic(owner: String) -> Result<Vec<(u64, Item)>, ItemError> {
    let item_ids =
        OWNER_ITEMS.with(|items| items.borrow().get(&owner).unwrap_or_default().ids.clone());

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

pub fn get_items_by_subcategory_logic(category: String, subcategory: String) -> Result<Vec<(u64, Item)>, ItemError> {
    let category = Category::from_str(&category).ok_or(ItemError::NotExist)?;
    if !is_valid_subcategory(category, &subcategory) {
        return Err(ItemError::Invalid);
    }
    let subcategory = SubCategory::new(category, &subcategory);

    let item_ids = SUBCATEGORY_ITEMS.with(|items| {
        items
            .borrow()
            .get(&subcategory)
            .unwrap_or_default()
            .ids
            .clone()
    });

    if item_ids.is_empty() {
        return Err(ItemError::NoItemsAssociated);
    }

    let items_in_subcategory = ITEMS.with(|items_map| {
        let items_map = items_map.borrow();
        item_ids
            .into_iter()
            .filter_map(|id| items_map.get(&id).map(|item| (id, item.clone())))
            .collect()
    });

    Ok(items_in_subcategory)
}


pub fn update_item_logic(id: u64, item: UpdateItem, item_owner: String) -> Result<(), ItemError> {
    ITEMS.with(|p| {
        let mut items = p.borrow_mut();
        let old_item_opt = items.get(&id).clone();

        match old_item_opt {
            Some(old_item) => {
                if old_item.owner != item_owner {
                    return Err(ItemError::Unauthorized);
                }

                let updated_item = Item {
                    item: old_item.item,
                    price: item.price.unwrap_or(old_item.price),
                    description: item.description.unwrap_or(old_item.description),
                    image: item.image.unwrap_or(old_item.image),
                    reviews: old_item.reviews,
                    owner: old_item.owner,
                    contract_address: old_item.contract_address,
                    stock: item.stock.unwrap_or(old_item.stock),
                    category: old_item.category,
                    subcategory: old_item.subcategory,
                };

                items.insert(id, updated_item);
                Ok(())
            }
            None => Err(ItemError::NotExist),
        }
    })
}

pub fn remove_item_logic(id: u64, item_owner: String) -> Result<(), ItemError> {
    ITEMS.with(|p| {
        let mut items = p.borrow_mut();
        let old_item_opt = items.get(&id).clone();

        match old_item_opt {
            Some(old_item) => {
                if old_item.owner != item_owner {
                    return Err(ItemError::Unauthorized);
                }

                items.remove(&id);
                Ok(())
            }
            None => Err(ItemError::NotExist),
        }
    })
}