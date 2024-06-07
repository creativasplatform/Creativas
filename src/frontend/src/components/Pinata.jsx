import React, { useState } from 'react';
import usePinata from '../hooks/pinata/usepinata.jsx'; // Importa el hook usePinata que acabamos de crear

const PinataExample = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { uploadFile, fetchImage, loading, error, hash, imageUrl } = usePinata();
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const uploadedHash = await uploadFile(selectedFile);
            console.log('File uploaded successfully. Hash:', uploadedHash);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFetchImage = async () => {
        try {
            await fetchImage(hash);
            console.log('Image fetched successfully');
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || loading}>
                Upload
            </button>
            {hash && (
                <button onClick={handleFetchImage} disabled={loading}>
                    Fetch Image
                </button>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {imageUrl && (
                <div>
                    <p>Image URL: {imageUrl}</p>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default PinataExample;