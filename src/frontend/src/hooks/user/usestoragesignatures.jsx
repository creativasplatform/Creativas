import { useState } from 'react';
import { useDfinity } from '../../context/IdentityContext.jsx';
import { useUserContext } from '../../context/userContext.jsx';
import { user_signatures } from 'declarations/user_signatures';

const useSignatureStorage = () => {
    const { actor } = useDfinity();
    const [error, setError] = useState(null);
    const { address } = useUserContext();

    // Función para agregar una firma
    const addUserSignature = async (signature) => {
        if (!actor) {
            setError(new Error("Actor is not initialized"));
            return;
        }
        try {
            // Llama a la función add_signature del canister usando el actor
            await actor.add_signature(address, signature);
        } catch (err) {
            setError(err);
        }
    };

    // Función para obtener una firma
    const getUserSignature = async () => {
        try {
            // Llama a la función get_signature del canister usando el actor
            const signature = await user_signatures.get_signature(address);
            return signature;
        } catch (err) {
            setError(err);
            return null;
        }
    };

    // Función para verificar si existe una firma
    const hasUserSignature = async () => {
        try {
            // Llama a la función has_signature del canister usando el actor
            const hasSignature = await user_signatures.has_signature(address);
            return hasSignature;
        } catch (err) {
            setError(err);
            return false;
        }
    };

    return {
        addUserSignature,
        getUserSignature,
        hasUserSignature,
        error
    };
};

export default useSignatureStorage;
