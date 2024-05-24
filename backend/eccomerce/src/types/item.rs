use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;

const MAX_VALUE_SIZE_ITEM: u32 = 5000;

#[derive(CandidType, Deserialize, Clone)]
pub struct Item {
    pub item: String,
    pub price: u64,
    pub description: String,
    pub image: String,
    pub reviews: Vec<crate::types::review::Review>,
    pub owner: String,
    pub contract_address: String,
    pub stock: u64,
    pub category: crate::types::category::Category,
}

#[derive(CandidType, Deserialize)]
pub struct CreateItem {
    pub item: String,
    pub price: u64,
    pub description: String,
    pub image: String,
    pub contract_address: String,
    pub stock: u64,
    pub category: String,
}

#[derive(CandidType, Deserialize)]
pub struct UpdateItem {
    pub price: Option<u64>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub stock: Option<u64>,
}

impl Storable for Item {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_ITEM,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone, Debug, Hash, PartialEq)]
pub enum ItemError {
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

