import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createActor } from "declarations/user_signatures";
import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";

// Creamos el contexto
const DfinityContext = createContext();

// Proveedor del contexto
export const DfinityProvider = ({ children }) => {
    const [actorUserSiganeture, setActorUserSiganeture] = useState(null);
    const [AnonymousaActorUserSiganeture, setAnonymousActorUserSiganeture] = useState(null)

    const createActorWithIdentity = useCallback(async () => {
        try {
            const privateKeyString = import.meta.env.VITE_PRIVATE_IDENTITY;
            const privateKey = new Uint8Array(privateKeyString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const identity = Ed25519KeyIdentity.fromSecretKey(privateKey);
    
            const idendad = identity.getPrincipal()
            console.log(idendad.toText())
            const agent = new HttpAgent({ identity, host: 'http://127.0.0.1:8000' });

            // Crear actor
            const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";

            console.log("Canister id", canisterId)

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
