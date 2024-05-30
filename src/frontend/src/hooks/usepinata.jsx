import { useState } from 'react';
import axios from 'axios';

const usePinata = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hash, setHash] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); 

    const fetchImage = async (hash) => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://green-capable-vole-518.mypinata.cloud/ipfs/${hash}`;
            await axios.get(url);
            setLoading(false);
            setImageUrl(url); 
            return url;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error; 
        }
    };

    const uploadFile = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const API_KEY = import.meta.env.VITE_PINATA_API_KEY;
            const API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;

            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
            const response = await axios.post(
                url,
                formData,
                {
                    maxContentLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                        'pinata_api_key': API_KEY,
                        'pinata_secret_api_key': API_SECRET
                    }
                }
            );
            setLoading(false);
            setHash(response.data.IpfsHash);
            return response.data.IpfsHash;
        } catch (error) {
            setError(error);
            setLoading(false);
            throw error; 
        }
    };

    return { fetchImage, uploadFile, loading, error, hash, imageUrl };
};

export default usePinata;
