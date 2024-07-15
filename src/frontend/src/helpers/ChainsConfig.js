import { CHAIN_NAMESPACES } from "@web3auth/base";
const API_KEY = 'CG-Fp12f1rhwzh4QrGK8vCkRpKc';
import axios from "axios";

export const NETWORKS = {
    RSK_TESTNET: {
      chainId: 31,
      chainName: 'RSK Testnet',
      rpcUrls: ['https://public-node.testnet.rsk.co'],
      blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
      nativeCurrency: {
        name: 'Test RSK Bitcoin',
        symbol: 'tRBTC',
        decimals: 18,
      },
    },
    SEPOLIA_TESTNET: {
      chainId: 11155111,
      chainName: 'Sepolia Testnet',
      rpcUrls: ['https://sepolia.infura.io/v3/c9cff4159b23445abffec6c3273932ae'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
      nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'SEP',
        decimals: 18,
      },
    },
  };
  

export const chainConfigWeb3authRsk = {
    chainId: "0x1f", // 31 en hexadecimal para RSK Testnet
    rpcTarget: "https://public-node.testnet.rsk.co",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "RSK Testnet",
    blockExplorerUrl: "https://explorer.testnet.rsk.co",
    ticker: "tRBTC",
    tickerName: "Testnet RBTC",
    logo: "https://path-to-rsk-logo.svg", // Cambia esto a la URL del logo de RSK
};

export const chainConfigWeb3authSepolia = {
    chainId: "0xaa36a7", // 31 en hexadecimal para RSK Testnet
    rpcTarget: "https://sepolia.infura.io/v3/c9cff4159b23445abffec6c3273932ae",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "SEP",
    tickerName: "SepoliaETH",
    logo: "https://path-to-rsk-logo.svg", // Cambia esto a la URL del logo de RSK
};



