use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;
const MAX_VALUE_SIZE_CATEGORY: u32 = 5000;

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy, Debug, Hash)]
pub enum Category {
    Technology,
    Gaming,
    Music,
    Movies,
    Art
    
}

impl Category {
    pub fn from_str(category: &str) -> Option<Self> {
        match category {
            "Technology" => Some(Category::Technology),
            "Gaming" => Some(Category::Gaming),
            "Music" => Some(Category::Music),
            "Movies" => Some(Category::Movies),
            "Art" => Some(Category::Art),
            _ => None,
        }
    }
}

impl Storable for Category {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_CATEGORY,
        is_fixed_size: false,
    };
}

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct SubCategory {
    pub category: Category,
    pub subcategory: String,
}

