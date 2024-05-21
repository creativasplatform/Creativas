use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;
use std::collections::HashMap;


const MAX_VALUE_SIZE_VEC_STORABLE: u32 = 8000;
const MAX_VALUE_SIZE_BOOL_STORABLE: u32 = 500;
const MAX_VALUE_SIZE_IEM_CARD_NUMBER_STORABLE: u32 = 500;
const MAX_VALUE_SIZE_IEM_CARD_BOOL_STORABLE: u32 = 500;


#[derive(CandidType, Deserialize, Clone, Default)]
pub struct VecStorable {
    pub ids: Vec<u64>,
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
pub struct OwnerItemCardBoolStorable {
    pub owner: HashMap<u64, BoolStorable>,
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
   pub owner: HashMap<u64, u64>,
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


#[derive(Eq, PartialEq, CandidType, Deserialize, Clone, PartialOrd, Ord)]
pub struct BoolStorable {
   pub bool: bool,
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
