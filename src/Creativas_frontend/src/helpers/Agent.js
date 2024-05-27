import { HttpAgent } from '@dfinity/agent';
import { createActor } from '../../src/declarations/eccomerce';

const createEccomerceActor = () => {
    // Obtener el ID del canister desde las variables de entorno
    const canisterId =   import.meta.env.CANISTER_ID_ECCOMERCE;

    console.log("Canister id", canisterId)
};

export default createEccomerceActor;
