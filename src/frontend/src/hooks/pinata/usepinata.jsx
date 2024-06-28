import { useState } from 'react';
import axios from 'axios';


const API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const API_SECRET = import.meta.env.VITE_PINATA_API_SECRET;
const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

const usePinata = () => {
    const [error, setError] = useState(null);

    const fetchImage = async (hash) => {
        setError(null);
        try {
            const url = `https://green-capable-vole-518.mypinata.cloud/ipfs/${hash}`;
            await axios.get(url);
            return url;
        } catch (error) {
            setError(error);
            throw error; 
        }
    };

    const uploadFile = async (file) => {
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);

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
            return response.data.IpfsHash;
        } catch (error) {
            setError(error);
            throw error; 
        }
    };

    const uploadJsonToPinata = async (name, image, description) => {
        setError(null);
        try {
            const jsonData = {
                name: name,
                image: image,
                description: description
            };

            const blob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
            const formData = new FormData();
            formData.append("file", blob, "data.json");


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
            return response.data.IpfsHash;
        } catch (error) {
            setError(error);
            throw error; 
        }
    };

    return { fetchImage, uploadFile, uploadJsonToPinata, error };
};

export default usePinata;
