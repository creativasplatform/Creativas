// Genera una nueva identidad
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { nft_venture, createActor } from "../declarations/nft_venture/index.js";
import { AuthClient, IdbStorage } from "@dfinity/auth-client";
import { HttpAgent, Actor } from "@dfinity/agent";



 async function getIdentity() {
 
  
    const privateKeyString = "cbb652aa6722ee38399e75ab211ea2b365a766444797f4f30c3dc38ff34a2c90725f60ffa695074abe0785d25ee4cce70a4cc505c668efd746d45c6c248f87fb"
  
    // Convierte la clave privada a un array de bytes
    const privateKey = new Uint8Array(privateKeyString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  
    // Crea una identidad a partir de la clave privada
    const identity = Ed25519KeyIdentity.fromSecretKey(privateKey);
    // Crea un agente con la identidad
    const agent = new HttpAgent({ 
        identity,
        host: 'http://localhost:1200' // Asegúrate de reemplazar esto con la URL de tu host
    });
    console.log("agente", agent)
    const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"
    const newActor = createActor(canisterId, { agent });

    const principal = await newActor.whoami();

    console.log("Principal", principal.toText())
  }


  getIdentity()