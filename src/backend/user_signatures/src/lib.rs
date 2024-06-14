use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;
use candid::{CandidType, Deserialize};
type Memory = VirtualMemory<DefaultMemoryImpl>;
use b3_utils::caller_is_controller;

#[derive(CandidType, Deserialize, Clone, Debug, PartialEq)]
pub enum SignatureError {
    AlreadyExist,
    InsertionFailed,
    NotExist
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static SIGNATURES: RefCell<StableBTreeMap<String, String, Memory>> = RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
    ));
}

#[ic_cdk::update(guard = "caller_is_controller")]
fn add_signature(user_address: String, signature: String) -> Result<(), SignatureError> {
    SIGNATURES.with(|signatures| {
        let mut signatures = signatures.borrow_mut();
        if signatures.contains_key(&user_address) {
            Err(SignatureError::AlreadyExist)
        } else if signatures.insert(user_address.clone(), signature.clone()).is_none() {
            Err(SignatureError::InsertionFailed)
        } else {
            Ok(())
        }
    })
}

#[ic_cdk::query]
fn has_signature(user_address: String) -> bool {
    SIGNATURES.with(|signatures| {
        signatures.borrow().contains_key(&user_address)
    })
}


#[ic_cdk::query]
fn get_signature(user_address: String) -> Result<String, SignatureError> {
    SIGNATURES.with(|signatures| {
        signatures.borrow().get(&user_address).clone().ok_or(SignatureError::NotExist)
    })
}