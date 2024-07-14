import RLogin from "@rsksmart/rlogin";
/*
import Portis from "@portis/web3";
*/
import { WalletConnect2Provider } from '@rsksmart/rlogin-walletconnect2-provider'
import Torus from "@toruslabs/torus-embed";
import { trezorProviderOptions } from "@rsksmart/rlogin-trezor-provider";
import { ledgerProviderOptions } from "@rsksmart/rlogin-ledger-provider";
import { dcentProviderOptions } from "@rsksmart/rlogin-dcent-provider";



export const rpcUrls = {
  31: 'https://public-node.testnet.rsk.co',
  11155111 : 'https://sepolia.infura.io/v3/c9cff4159b23445abffec6c3273932ae', 
}

const requiredChainsId = [31]

const optionalChainsId = Object.keys(rpcUrls).map(Number).filter(chainId => chainId !== 31)

export const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnect2Provider,
      options: {
        projectId: 'd20d52a02de4faf7056d37c0b7558dfb',
        chains: requiredChainsId,
        optionalChainsId: optionalChainsId,
        showQrModal: true,
        rpcMap: rpcUrls,
      }
    },
    // portis: {
    //   package: Portis,
    //   options: {
    //     id: "a1c8672b-7b1c-476b-b3d0-41c27d575920",
    //     network: {
    //       nodeUrl: 'https://public-node.testnet.rsk.co',
    //       chainId: 31,
    //     }
    //   }
    // },
    torus: {
      package: Torus,
    },
    'custom-ledger': {
      ...ledgerProviderOptions,
    },
    'custom-dcent': {
      ...dcentProviderOptions,
    },
    'custom-trezor': {
      ...trezorProviderOptions,
      options: {
        manifestEmail: 'info@iovlabs.org',
        manifestAppUrl: 'https://basic-sample.rlogin.identity.rifos.org/',
      }
    }
  },
  defaultTheme: "dark",
  rpcUrls,
})