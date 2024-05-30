import React from 'react';
import useItems from '../hooks/useItems.jsx';

const Items = () => {
    const { items, loading, error } = useItems();
    console.log(items)
    console.log("Holla mundo")

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
