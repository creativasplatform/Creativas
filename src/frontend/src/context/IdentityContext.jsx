import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createActor } from "declarations/user_signatures";
import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";

// Creamos el contexto
const DfinityContext = createContext();

// Proveedor del contexto
export const DfinityProvider = ({ children }) => {
    const [actor, setActor] = useState(null);

    const createActorWithIdentity = useCallback(async () => {
        try {
            const privateKeyString = import.meta.env.VITE_PRIVATE_IDENTITY;
            const privateKey = new Uint8Array(privateKeyString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const identity = Ed25519KeyIdentity.fromSecretKey(privateKey);
    
            const agent = new HttpAgent({ identity, host: 'http://localhost:8080' });

            // Crear actor
            const canisterId = import.meta.env.VITE_CANISTER_ID;
            console.log(canisterId)
            const newActor = createActor(canisterId, { agent });
            setActor(newActor);
        } catch (error) {
            console.error("Error creating actorr:", error);
        }
    }, []);

    useEffect(() => {
        createActorWithIdentity();
    }, []);


    return (
        <DfinityContext.Provider value={{ actor, createActorWithIdentity }}>
            {children}
        </DfinityContext.Provider>
    );
};

export const useDfinity = () => useContext(DfinityContext);
