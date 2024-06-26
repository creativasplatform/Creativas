require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
// Asegúrate de tener este plugin instalado
require('hardhat-deploy');

const dotenv =  require('dotenv')


dotenv.config();

// Cambia esta clave privada con la clave privada de tu cuenta de Bitfinity
const ROOTSTOCK_PRIVATE_KEY =  process.env.ROOTSTOCK_PRIVATE_KEY;


module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
      viaIR: true, // Añade esta línea
    }
  },
  networks: {
    testnet_rootstock : {
      url: 'https://public-node.testnet.rsk.co',
      accounts: [ROOTSTOCK_PRIVATE_KEY],
      chainId: 31,
      timeout: 40000, 
      gasPrice: 60000000, // Aumenta este valor
      blockGasLimit: 100000000, // Ajusta este valor según tus necesidades
    }
    // local: {
    //   url: 'http://127.0.0.1:8545/',
    //   accounts: [PRIVATE_KEY],
    //   chainId: 31337,
    //   timeout: 40000, 
    //   gasPrice: 20000000000

    // }
     // local_bitfinity: {
    //   url: 'http://127.0.0.1:8545',
    //   accounts: [0x${BITFINITY_PRIVATE_KEY}],
    //   chainId: 355113,
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0, // Index de la cuenta en el array de cuentas
    },
  },
};