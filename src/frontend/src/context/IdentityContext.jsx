import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createActor } from "declarations/user_signatures";
import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";

const canisterId = import.meta.env.VITE_CANISTER_ID;
const privateKeyString = import.meta.env.VITE_PRIVATE_IDENTITY;
const DfinityContext = createContext();

// Proveedor del contexto
export const DfinityProvider = ({ children }) => {
    const [actorUserSiganeture, setActorUserSiganeture] = useState(null);
    const [AnonymousaActorUserSiganeture, setAnonymousActorUserSiganeture] = useState(null)

    const createActorWithIdentity = useCallback(async () => {
        try {

            const privateKey = new Uint8Array(privateKeyString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const identity = Ed25519KeyIdentity.fromSecretKey(privateKey);
            const agent = new HttpAgent({ identity, host: 'http://127.0.0.1:8000' });
            const newActor = createActor(canisterId, { agent });
            const newActorAnonymous = createActor(canisterId);
            setActorUserSiganeture(newActor);
            setAnonymousActorUserSiganeture(newActorAnonymous)
        } catch (error) {
            console.error("Error creating actorr:", error);
        }
    }, []);

    useEffect(() => {
        createActorWithIdentity();
    }, []);


    return (
        <DfinityContext.Provider value={{ actorUserSiganeture, createActorWithIdentity, AnonymousaActorUserSiganeture }}>
            {children}
        </DfinityContext.Provider>
    );
};

export const useDfinity = () => useContext(DfinityContext);
