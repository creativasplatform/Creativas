import { useState } from 'react';
import axios from 'axios';

const usePinata = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchImage = async (hash) => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://green-capable-vole-518.mypinata.cloud/ipfs/${hash}`;
            // Optionally, you can use axios to check if the image exists
            await axios.get(url);
            setLoading(false);
            return url;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error; // Re-throw the error so it can be handled by the caller
        }
    };

    return { fetchImage, loading, error };
};

export default usePinata;
