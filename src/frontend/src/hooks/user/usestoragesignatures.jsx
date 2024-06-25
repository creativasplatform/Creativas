import { useState } from 'react';
import { useDfinity } from '../../context/IdentityContext.jsx';
import { useUserContext } from '../../context/userContext.jsx';

const useSignatureStorage = () => {
    const { actorUserSiganeture, AnonymousaActorUserSiganeture } = useDfinity();
    const { address } = useUserContext();

    // Función para agregar una firma
    const addUserSignature = async (signature) => {
        if (!actorUserSiganeture) {
            console.error("Actor is not initialized.");
            return;
        }

        try {
            const result = await actorUserSiganeture.add_signature(address, signature);
            
            if (result.Err) {
            console.error("Something was wrong")
            } else {
                return signature;
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };
    

    // Función para obtener una firma
    const getUserSignature = async () => {
        try {
            // Llama a la función get_signature del canister usando el actor
            const signature = await AnonymousaActorUserSiganeture.get_signature(address);
            return signature;
        } catch (err) {
            return null;
        }
    };

    // Función para verificar si existe una firma
    const hasUserSignature = async () => {
        try {
            const hasSignature = await AnonymousaActorUserSiganeture.has_signature(address);
            return hasSignature;
        } catch (err) {
            console.error(err)
            return false;
        }
    };

    return {
        addUserSignature,
        getUserSignature,
        hasUserSignature,
    };
};

export default useSignatureStorage;
