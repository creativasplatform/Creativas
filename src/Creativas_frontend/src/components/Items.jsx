import React from 'react';
import useItems from '../hooks/useItems';

const Items = () => {
    const { items, loading, error } = useItems();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>{items}</h1>
           
        </div>
    );
};

export default Items;
