use candid::{CandidType, Deserialize};
use serde_derive::Serialize;

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
            _ => None,
        }
    }
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Review {
    pub rating: Rating,
    pub review: String,
    pub reviewer: String,
}

#[derive(CandidType, Deserialize)]
pub struct CreateReview {
    pub item_id: u64,
    pub rating: u64,
    pub review: String,
}


#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub enum RatingError {
    Alreadyrated,
    InvalidValue,
    UpdateError,
}
