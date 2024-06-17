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
}



// Create a new rLogin instance with your custom providerOptions outside of the 
// component.
export const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnect2Provider,
      options: {
        projectId: 'd20d52a02de4faf7056d37c0b7558dfb',
        chains: ['31'],
        showQrModal: true,
        rpcMap: rpcUrls,
      }
    },

      /*
    portis: {
      package: Portis,
      options: {
        id: "a1c8672b-7b1c-476b-b3d0-41c27d575920",
        network: {
          nodeUrl: "https://public-node.testnet.rsk.co",
          chainId: 31
        }
      }
    },
    */
    "custom-ledger": ledgerProviderOptions,
    "custom-dcent": dcentProviderOptions,
    "custom-trezor": {
      ...trezorProviderOptions,
      options: {
        manifestEmail: "info@iovlabs.org",
        manifestAppUrl: "https://basic-sample.rlogin.identity.rifos.org/"
      }
    }
  },
  
  defaultTheme: 'dark', // Establece el tema oscuro como predeterminado
  customThemes: {
    dark: {
      background: "#10142b", // Cambia el color de fondo
      color: "#faf9f5" // Cambia el color del texto
    }
  }
});

