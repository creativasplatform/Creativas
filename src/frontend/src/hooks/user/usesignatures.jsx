import { useState } from 'react';
import { useDfinity } from '../../context/IdentityContext.jsx';

const useSignature = () => {
    const { actor } = useDfinity();
    const [error, setError] = useState(null);

    // Función para agregar una firma
    const addUserSignature = async (userAddress, signature) => {
        try {
            // Llama a la función add_signature del canister usando el actor
            await actor.add_signature(userAddress, signature);
        } catch (err) {
            setError(err);
        }
    };

    // Función para obtener una firma
    const getUserSignature = async (userAddress) => {
        try {
            // Llama a la función get_signature del canister usando el actor
            const signature = await actor.get_signature(userAddress);
            return signature;
        } catch (err) {
            setError(err);
            return null;
        }
    };

    // Función para verificar si existe una firma
    const hasUserSignature = async (userAddress) => {
        try {
            // Llama a la función has_signature del canister usando el actor
            const hasSignature = await actor.has_signature(userAddress);
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

export default useSignature;
