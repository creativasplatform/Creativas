use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryElectronics {
    Cellphones,
    Laptops,
    Smartwatches,
    Monitors,
    Headphones,
}

impl SubcategoryElectronics {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Cellphones" => Some(SubcategoryElectronics::Cellphones),
            "Laptops" => Some(SubcategoryElectronics::Laptops),
            "Smartwatches" => Some(SubcategoryElectronics::Smartwatches),
            "Monitors" => Some(SubcategoryElectronics::Monitors),
            "Headphones" => Some(SubcategoryElectronics::Headphones),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryClothingShoesAccessories {
    Tops,
    Bottoms,
    Shoes,
    Accessories,
    Outerwear,
}

impl SubcategoryClothingShoesAccessories {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Tops" => Some(SubcategoryClothingShoesAccessories::Tops),
            "Bottoms" => Some(SubcategoryClothingShoesAccessories::Bottoms),
            "Shoes" => Some(SubcategoryClothingShoesAccessories::Shoes),
            "Accessories" => Some(SubcategoryClothingShoesAccessories::Accessories),
            "Outerwear" => Some(SubcategoryClothingShoesAccessories::Outerwear),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryHomeKitchen {
    Cookware,
    Appliances,
    Utensils,
    Storage,
    Dining,
}

impl SubcategoryHomeKitchen {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Cookware" => Some(SubcategoryHomeKitchen::Cookware),
            "Appliances" => Some(SubcategoryHomeKitchen::Appliances),
            "Utensils" => Some(SubcategoryHomeKitchen::Utensils),
            "Storage" => Some(SubcategoryHomeKitchen::Storage),
            "Dining" => Some(SubcategoryHomeKitchen::Dining),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryBeautyPersonalCare {
    Skincare,
    Haircare,
    Makeup,
    PersonalHygiene,
    Fragrances,
}

impl SubcategoryBeautyPersonalCare {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Skincare" => Some(SubcategoryBeautyPersonalCare::Skincare),
            "Haircare" => Some(SubcategoryBeautyPersonalCare::Haircare),
            "Makeup" => Some(SubcategoryBeautyPersonalCare::Makeup),
            "PersonalHygiene" => Some(SubcategoryBeautyPersonalCare::PersonalHygiene),
            "Fragrances" => Some(SubcategoryBeautyPersonalCare::Fragrances),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryBooks {
    Fiction,
    NonFiction,
    MysteryThriller,
    ScienceFictionFantasy,
    BiographyAutobiography,
}

impl SubcategoryBooks {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Fiction" => Some(SubcategoryBooks::Fiction),
            "NonFiction" => Some(SubcategoryBooks::NonFiction),
            "MysteryThriller" => Some(SubcategoryBooks::MysteryThriller),
            "ScienceFictionFantasy" => Some(SubcategoryBooks::ScienceFictionFantasy),
            "BiographyAutobiography" => Some(SubcategoryBooks::BiographyAutobiography),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategorySportsOutdoor {
    FitnessEquipment,
    OutdoorGear,
    SportingGoods,
    Activewear,
    CampingHiking,
}

impl SubcategorySportsOutdoor {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "FitnessEquipment" => Some(SubcategorySportsOutdoor::FitnessEquipment),
            "OutdoorGear" => Some(SubcategorySportsOutdoor::OutdoorGear),
            "SportingGoods" => Some(SubcategorySportsOutdoor::SportingGoods),
            "Activewear" => Some(SubcategorySportsOutdoor::Activewear),
            "CampingHiking" => Some(SubcategorySportsOutdoor::CampingHiking),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryFoodBeverages {
    Snacks,
    Beverages,
    Condiments,
    Baking,
    Dairy,
}

impl SubcategoryFoodBeverages {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Snacks" => Some(SubcategoryFoodBeverages::Snacks),
            "Beverages" => Some(SubcategoryFoodBeverages::Beverages),
            "Condiments" => Some(SubcategoryFoodBeverages::Condiments),
            "Baking" => Some(SubcategoryFoodBeverages::Baking),
            "Dairy" => Some(SubcategoryFoodBeverages::Dairy),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryHomeImprovement {
    Tools,
    Hardware,
    Electrical,
    Plumbing,
    PaintingSupplies,
}

impl SubcategoryHomeImprovement {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Tools" => Some(SubcategoryHomeImprovement::Tools),
            "Hardware" => Some(SubcategoryHomeImprovement::Hardware),
            "Electrical" => Some(SubcategoryHomeImprovement::Electrical),
            "Plumbing" => Some(SubcategoryHomeImprovement::Plumbing),
            "PaintingSupplies" => Some(SubcategoryHomeImprovement::PaintingSupplies),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryBaby {
    Clothing,
    DiapersWipes,
    NurseryFurniture,
    Toys,
    FeedingSupplies,
}

impl SubcategoryBaby {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Clothing" => Some(SubcategoryBaby::Clothing),
            "DiapersWipes" => Some(SubcategoryBaby::DiapersWipes),
            "NurseryFurniture" => Some(SubcategoryBaby::NurseryFurniture),
            "Toys" => Some(SubcategoryBaby::Toys),
            "FeedingSupplies" => Some(SubcategoryBaby::FeedingSupplies),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryPetsAccessories {
    Food,
    Toys,
    Beds,
    Grooming,
    CollarsLeashes,
}

impl SubcategoryPetsAccessories {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Food" => Some(SubcategoryPetsAccessories::Food),
            "Toys" => Some(SubcategoryPetsAccessories::Toys),
            "Beds" => Some(SubcategoryPetsAccessories::Beds),
            "Grooming" => Some(SubcategoryPetsAccessories::Grooming),
            "CollarsLeashes" => Some(SubcategoryPetsAccessories::CollarsLeashes),
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord, Copy)]
pub enum SubcategoryFood {
    Produce,
    CannedGoods,
    FrozenFoods,
    Snacks,
    BakingIngredients,
}

impl SubcategoryFood {
    pub fn from_str(subcategory: &str) -> Option<Self> {
        match subcategory {
            "Produce" => Some(SubcategoryFood::Produce),
            "CannedGoods" => Some(SubcategoryFood::CannedGoods),
            "FrozenFoods" => Some(SubcategoryFood::FrozenFoods),
            "Snacks" => Some(SubcategoryFood::Snacks),
            "BakingIngredients" => Some(SubcategoryFood::BakingIngredients),
            _ => None,
        }
    }
}
