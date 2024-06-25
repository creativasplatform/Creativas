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




const Abi2 = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "reward_tokens",
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
            "internalType": "address",
            "name": "investor",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "LogInvestment",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "Reward_tokens",
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
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          }
        ],
        "name": "getInvestmentDetails",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "totalInvested",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "remainingFunding",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
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
        "name": "getInvestmentHistory",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "investors",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[][]",
            "name": "tokenIds",
            "type": "uint256[][]"
          },
          {
            "internalType": "uint256[][]",
            "name": "tokenAmounts",
            "type": "uint256[][]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "investor",
            "type": "address"
          }
        ],
        "name": "getInvestmentsByAddress",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "assetIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[][]",
            "name": "tokenIds",
            "type": "uint256[][]"
          },
          {
            "internalType": "uint256[][]",
            "name": "tokenAmounts",
            "type": "uint256[][]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "investor",
            "type": "address"
          }
        ],
        "name": "getInvestmentsByAddressInAsset",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "tokenAmounts",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "rewardTokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          }
        ],
        "name": "investAsset",
        "outputs": [],
        "stateMutability": "payable",
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
      }
]

const contractAddress2 = "0x1579653a60536A6bCAC6eb33dB4Bbb4eB62b043c";



// Conectar al contrato RES4

// Cuenta que enviará la transacción
const privateKey2 = "a8e75c6af211d8c561c6581e1f718992a78bfebbc4a2d452639db02a6051d84c";
const wallet2 = new ethers.Wallet(privateKey2, provider);
const contract2 = new ethers.Contract(contractAddress2, Abi2, wallet2);


async function investInAsset(assetId, tokenAmount) {
    try {
        // Obtener el ID del token de recompensa para el primer tipo de recompensa del activo
        const rewards = await contract.getRewardsForAsset(assetId);
        const rewardTokenId = rewards[0].rewardTokenId; // ID del primer token de recompensa

        // Obtener el precio individual de la primera recompensa
        const individualPrice = rewards[0].individualPrice;

        // Calcular el valor total a invertir
        const totalValue = individualPrice * tokenAmount;

        // Llamar a la función investAsset del contrato para invertir en el primer tipo de recompensa del activo específico
        const tx = await contract2.investAsset(assetId, rewardTokenId, tokenAmount, {
            value: totalValue // Proporcionar el valor total calculado
        });
        console.log("Transaction hash:", tx.hash);

        // Esperar a que la transacción se confirme
        await tx.wait();

        console.log("Investment successful!");
    } catch (error) {
        console.error("Error:", error);
    }
}


async function getInvestmentDetails(assetId) {
    try {
        // Llamar a la función getInvestmentDetails del contrato para obtener detalles de la inversión en un activo específico
        const { totalInvested, remainingFunding } = await contract2.getInvestmentDetails(assetId);
        console.log("Total invested:", totalInvested.toString());
        console.log("Remaining funding:", remainingFunding.toString());
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getInvestmentHistory(assetId) {
    try {
        // Llamar a la función getInvestmentHistory del contrato para obtener el historial de inversiones en un activo específico
        const { investors, amounts, tokenIds, tokenAmounts } = await contract2.getInvestmentHistory(assetId);

        console.log("Investment history for asset", assetId.toString() + ":");

        investors.forEach((investor, index) => {
            console.log("Investor:", investor);
            console.log("Amount invested:", amounts[index].toString());

            tokenIds[index].forEach((tokenId, idx) => {
                console.log("Token ID:", ethers.BigNumber.from(tokenId).toString());
                console.log("Token amount for investor:", tokenAmounts[index][idx].toString());
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getInvestmentsByAddress(investor) {
    try {
        // Llamar a la función getInvestmentsByAddress del contrato para obtener las inversiones realizadas por una dirección de inversor específica
        const { assetIds, amounts, tokenIds, tokenAmounts } = await contract2.getInvestmentsByAddress(investor);

        console.log("Investments made by address", investor + ":");

        assetIds.forEach((assetId, index) => {
            console.log("Asset ID:", assetId.toString());
            console.log("Amount invested:", amounts[index].toString());

            tokenIds[index].forEach((tokenId, idx) => {
                console.log("Token ID:", ethers.BigNumber.from(tokenId).toString());
                console.log("Token amount for investor:", tokenAmounts[index][idx].toString());
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function getInvestmentsByAddressInAsset(assetId, investor) {
    try {
        // Llamar a la función getInvestmentsByAddressInAsset del contrato para obtener las inversiones realizadas por una dirección de inversor específica en un activo específico
        const { amount, tokenIds, tokenAmounts } = await contract2.getInvestmentsByAddressInAsset(assetId, investor);

        console.log("Investments made by address", investor, "in asset", assetId.toString() + ":");

        console.log("Amount invested:", amount.toString());

        tokenIds.forEach((tokenId, index) => {
            console.log("Token ID:", ethers.BigNumber.from(tokenId).toString());
            console.log("Token amount for investor:", tokenAmounts[index].toString());
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
await getInvestmentDetails(0)
await getInvestmentHistory(0)
 await getInvestmentsByAddress("0x2F59A1cf89c1124c79A86118A9339772c7F63EAF")
await getInvestmentsByAddressInAsset(0, "0x2F59A1cf89c1124c79A86118A9339772c7F63EAF");
}

main()