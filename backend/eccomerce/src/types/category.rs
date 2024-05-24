use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;

const MAX_VALUE_SIZE_CATEGORY: u32 = 5000;

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
    Food,
}

impl Category {
    pub fn from_str(category: &str) -> Option<Self> {
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
