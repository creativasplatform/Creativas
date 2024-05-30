use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;
const MAX_VALUE_SIZE_SHIPPING_CARD: u32 = 5000;

#[derive(CandidType, Deserialize, Clone)]
pub struct ShippingCard {
    pub card: Vec<Card>,
    pub total_price: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Card {
    pub item_id: u64,
    pub item: crate::types::item::Item,
    pub amount: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct AddItem {
    pub item: u64,
    pub amount: u64,
}

impl Storable for ShippingCard {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_SHIPPING_CARD,
        is_fixed_size: false,
    };
}

impl Storable for Card {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_SHIPPING_CARD,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum UpdateAction {
    Add,
    Remove,
}

impl UpdateAction {
   pub fn from_str(category: &str) -> Option<Self> {
        match category {
            "Add" => Some(UpdateAction::Add),
            "Remove" => Some(UpdateAction::Remove),

            _ => None,
        }
    }
}