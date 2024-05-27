import { useState, useEffect } from 'react';
import { HttpAgent } from '@dfinity/agent';
import { createActor, canisterId } from '../../src/declarations/eccomerce';
import createEccomerceActor from '../helpers/Agent';

console.log(canisterId)
const canisterId2 = "bd3sg-teaaa-aaaaa-qaaba-cai"

export default function useItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(canisterId)

    useEffect(() => {
        const fetchItems = async () => {

                createEccomerceActor()
           
                // Crear un agente con identidad anónima
                const agent = new HttpAgent();
                console.log("agent", agent)

                // Crear un actor con el agente
                const eccomerce_canister = createActor(canisterId2, { agent });
                console.log("Canister", eccomerce_canister)
                // Llamar a la función whoami
                const saludar = await eccomerce_canister.whoami();
               console.log(saludar.toText())
            
        };

        fetchItems();
    }, []);

    return { items, loading, error, setItems };
}

