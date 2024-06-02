import React, { createContext, useContext, useState } from 'react';
import { createActor } from "declarations/nft_venture";
import { HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";

// Creamos el contexto
const DfinityContext = createContext();

// Proveedor del contexto
export const DfinityProvider = ({ children }) => {
    const [actor, setActor] = useState(null);

    const createActorWithIdentity = async () => {
        const privateKeyString = import.meta.env.VITE_PRIVATE_IDENTITY;
        const privateKey = new Uint8Array(privateKeyString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const identity = Ed25519KeyIdentity.fromSecretKey(privateKey);

        // Agente
        const agent = new HttpAgent({ identity, host: 'http://localhost:1200' });

        // Crear actor
        const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
        const newActor = createActor(canisterId, { agent });
        setActor(newActor);
    };

    return (
        <DfinityContext.Provider value={{ actor, createActorWithIdentity }}>
            {children}
        </DfinityContext.Provider>
    );
};

export const useDfinity = () => useContext(DfinityContext);
