import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { chainConfigWeb3authRsk } from "./ChainsConfig.js"

const clientId = "BC78RL2CQU0hOaUW_UW1RBz6AF3ATrEOIBRp2sOt3MtusgHIoMgj2Hs_xOxVgzmAsuE84PzmflbK8yuk5K3FdGo"; // Obtén esto desde https://dashboard.web3auth.io


const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig: chainConfigWeb3authRsk },
});

const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET, // Usa TESTNET para entornos de prueba
    privateKeyProvider: privateKeyProvider,
    sessionTime: 604800,
    uiConfig: {
        appName: "Creativas",
        mode: "dark",
        loginMethodsOrder: ["google", "apple", "twitter"],
        logoLight: "https://web3auth.io/images/web3auth-logo.svg",
        logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
        defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
        loginGridCol: 3,
        primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
    },
    modalZIndex: "99998",
});


// Exporta las constantes para usarlas en otros componentes
export { clientId, chainConfigWeb3authRsk, privateKeyProvider, web3auth };