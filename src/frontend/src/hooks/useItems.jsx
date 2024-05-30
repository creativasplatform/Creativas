import { useState, useEffect } from 'react';
import { eccomerce } from 'declarations/eccomerce';

export default function useItems() {
    // States
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [item, setItem] = useState(null);
    const [loadingItem, setLoadingItem] = useState(false);
    const [itemError, setItemError] = useState(null);
    const [ownerItems, setOwnerItems] = useState([]);
    const [loadingOwnerItems, setLoadingOwnerItems] = useState(false);
    const [ownerItemsError, setOwnerItemsError] = useState(null);

    useEffect(() => {
        // Function to fetch all items from the backend
        const fetchItems = async () => {
            try {
                const data = await eccomerce.get_items();
                setItems(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Function to create a new item in the backend
    const createItem = async (owner, item) => {
        setCreating(true);
        setCreateError(null);
        try {
            await eccomerce.set_item(owner, item);
            setCreating(false);
            setItems(prevItems => [...prevItems, { ...item, owner }]);
        } catch (err) {
            setCreateError(err);
            setCreating(false);
        }
    };

    // Function to fetch a single item by its ID from the backend
    const getItem = async (id) => {
        setLoadingItem(true);
        setItemError(null);
        try {
            const data = await eccomerce.get_item(id);
            setItem(data);
            setLoadingItem(false);
        } catch (err) {
            setItemError(err);
            setLoadingItem(false);
        }
    };

    // Function to fetch all items owned by a specific owner from the backend
    const getItemsByOwner = async (owner) => {
        setLoadingOwnerItems(true);
        setOwnerItemsError(null);
        try {
            const data = await eccomerce.get_items_owner(owner);
            setOwnerItems(data);
            setLoadingOwnerItems(false);
        } catch (err) {
            setOwnerItemsError(err);
            setLoadingOwnerItems(false);
        }
    };

    return { 
        items, loading, error, setItems, 
        creating, createError, createItem, 
        item, loadingItem, itemError, getItem,
        ownerItems, loadingOwnerItems, ownerItemsError, getItemsByOwner 
    };
}
