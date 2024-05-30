use candid::{CandidType, Deserialize, Encode, Decode};
use ic_stable_structures::{storable::Bound, Storable};
use std::borrow::Cow;
use crate::types::subcategories::*;
use crate::types::category::Category;


const MAX_VALUE_SIZE_SUB_CATEGORY: u32 = 5000;

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum Subcategory {
    SubcategoryElectronics(SubcategoryElectronics),
    SubcategoryClothingShoesAccessories(SubcategoryClothingShoesAccessories),
    SubcategoryHomeKitchen(SubcategoryHomeKitchen),
    SubcategoryBeautyPersonalCare(SubcategoryBeautyPersonalCare),
    SubcategoryBooks(SubcategoryBooks),
    SubcategorySportsOutdoor(SubcategorySportsOutdoor),
    SubcategoryFoodBeverages(SubcategoryFoodBeverages),
    SubcategoryHomeImprovement(SubcategoryHomeImprovement),
    SubcategoryBaby(SubcategoryBaby),
    SubcategoryPetsAccessories(SubcategoryPetsAccessories),
    SubcategoryFood(SubcategoryFood),
}

impl Subcategory {
    pub fn from_str(category: Category, subcategory: &str) -> Option<Self> {
        match category {
            Category::Electronics => SubcategoryElectronics::from_str(subcategory).map(Subcategory::SubcategoryElectronics),
            Category::ClothingShoesAccessories => SubcategoryClothingShoesAccessories::from_str(subcategory).map(Subcategory::SubcategoryClothingShoesAccessories),
            Category::HomeKitchen => SubcategoryHomeKitchen::from_str(subcategory).map(Subcategory::SubcategoryHomeKitchen),
            Category::BeautyPersonalCare => SubcategoryBeautyPersonalCare::from_str(subcategory).map(Subcategory::SubcategoryBeautyPersonalCare),
            Category::Books => SubcategoryBooks::from_str(subcategory).map(Subcategory::SubcategoryBooks),
            Category::SportsOutdoor => SubcategorySportsOutdoor::from_str(subcategory).map(Subcategory::SubcategorySportsOutdoor),
            Category::FoodBeverages => SubcategoryFoodBeverages::from_str(subcategory).map(Subcategory::SubcategoryFoodBeverages),
            Category::HomeImprovement => SubcategoryHomeImprovement::from_str(subcategory).map(Subcategory::SubcategoryHomeImprovement),
            Category::Baby => SubcategoryBaby::from_str(subcategory).map(Subcategory::SubcategoryBaby),
            Category::PetsAccessories => SubcategoryPetsAccessories::from_str(subcategory).map(Subcategory::SubcategoryPetsAccessories),
            Category::Food => SubcategoryFood::from_str(subcategory).map(Subcategory::SubcategoryFood),
        }
    }
}


impl Storable for Subcategory {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE_SUB_CATEGORY,
        is_fixed_size: false,
    };
}
