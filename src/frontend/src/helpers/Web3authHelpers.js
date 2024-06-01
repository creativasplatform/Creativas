// import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// const clientId = "BNptzOd_VvZveiriJzaHW7ZrZEpnsmHfQmeasmTBy1tIy2rR2bv7BHKnMcWF2lINaCw2JOLLYs3SvKNa_UYB_2w"; // Obtén esto desde https://dashboard.web3auth.io

// const chainConfig = {
//   chainId: "0x1f", // 31 en hexadecimal para RSK Testnet
//   rpcTarget: "https://public-node.testnet.rsk.co",
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   displayName: "RSK Testnet",
//   blockExplorerUrl: "https://explorer.testnet.rsk.co",
//   ticker: "tRBTC",
//   tickerName: "Testnet RBTC",
//   logo: "https://path-to-rsk-logo.svg", // Cambia esto a la URL del logo de RSK
// };

// const privateKeyProvider = new EthereumPrivateKeyProvider({
//   config: { chainConfig },
// })



// const web3auth = new Web3Auth({
//   clientId,
//   web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET, // Usa TESTNET para entornos de prueba
//   privateKeyProvider: privateKeyProvider,
//   sessionTime: 604800,
//   uiConfig: {
//     appName: "Creativas",
//     mode: "dark", // light, dark or auto
//     loginMethodsOrder: ["google", "apple", "twitter"],
//     logoLight: "https://web3auth.io/images/web3auth-logo.svg",
//     logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
//     defaultLanguage: "es", // en, de, ja, ko, zh, es, fr, pt, nl, tr
//     loginGridCol: 3,
//     primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
//   },
//   modalZIndex: "99998",
// });


// // Exporta las constantes para usarlas en otros componentes
// export { clientId, chainConfig, privateKeyProvider, web3auth };
