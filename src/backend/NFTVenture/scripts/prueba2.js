const { ethers } = require("ethers");


const Abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardsCount",
        "type": "uint256"
      }
    ],
    "name": "RewardsAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "tokenURI",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "individualPrice",
            "type": "uint256"
          }
        ],
        "internalType": "struct NewReward[]",
        "name": "rewards",
        "type": "tuple[]"
      }
    ],
    "name": "addRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "getRewardsForAsset",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "individualPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "availableTokens",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "rewardTokenId",
            "type": "uint256"
          }
        ],
        "internalType": "struct Reward[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155BatchReceived",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC1155Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "supervisor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const contractAddress = "0x80AbE260F0558e883f4F45D82E9dF35163a93c10";
// Dirección del proveedor de la red (RPC)
const rpcURL = "https://public-node.testnet.rsk.co";

// Crear una instancia del proveedor de la red
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// Cuenta que enviará la transacción
const privateKey = "30dbccd5b9934100c5e4ed422b0bea04a3b4eee5c34a044514557c6515aad348";
const wallet = new ethers.Wallet(privateKey, provider);

// Conectar al contrato RES4
const contract = new ethers.Contract(contractAddress, Abi, wallet);


async function addRewards() {
  const assetId = 1;
  const rewards = [
    {
      tokenURI: "https://gateway.pinata.cloud/ipfs/Qmd5RRGiMoHvfjk5zKZuS8xvgx1J8swJa5yZ3JKktyRTLB",
      title: "Título de la recompensa 1",
      description: "Descripción de la recompensa 1",
      tokenAmount: 10,
      individualPrice: 10,
    },
    {
      tokenURI: "https://gateway.pinata.cloud/ipfs/Qmd5RRGiMoHvfjk5zKZuS8xvgx1J8swJa5yZ3JKktyRTLB",
      title: "Título de la recompensa 3",
      description: "Descripción de la recompensa 3",
      tokenAmount: 10,
      individualPrice: 10,
    },


  ];

  try {
    // Estimar el gas necesario para la llamada
    const gasEstimate = await contract.estimateGas.addRewards(assetId, rewards);
    console.log("Gas estimate:", gasEstimate.toString());

    // Llamar a la función addRewards para agregar las recompensas al proyecto con el límite de gas estimado
    const tx = await contract.addRewards(assetId, rewards, {
      gasLimit: gasEstimate // Multiplica por 2 para asegurarte de tener suficiente gas
    });
    console.log("Transaction hash:", tx.hash);

    // Esperar a que la transacción se confirme
    await tx.wait();

    console.log("Rewards added successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function rewards() {
  try {
    const rewards = await contract.getRewardsForAsset(0);

    console.log("Recompensas del activo:");

    // Iterar sobre cada recompensa y mostrar solo las propiedades relevantes
    rewards.forEach((reward, index) => {
      console.log(`Recompensa ${index + 1}:`);
      console.log(`  Título: ${reward.title}`);
      console.log(`  Descripción: ${reward.description}`);
      console.log(`  Cantidad de tokens: ${reward.tokenAmount.toString()}`);
      console.log(`  Precio individual: ${reward.individualPrice.toString()}`);
      console.log(`  Tokens disponibles: ${reward.availableTokens.toString()}`);
      console.log(`  ID del token de recompensa: ${reward.rewardTokenId.toString()}`);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}



// Ejecutar la función principal
rewards();