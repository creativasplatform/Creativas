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
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "AssetCreated",
    "type": "event"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "mainPhoto",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "secondaryPhotos",
        "type": "string[]"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "UpdateAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "author",
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
        "name": "projectEndDate",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mainPhoto",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "secondaryPhotos",
        "type": "string[]"
      }
    ],
    "name": "addAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "enum ProjectStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "getAllAssets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
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
            "name": "projectStartDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "projectEndDate",
            "type": "uint256"
          },
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
            "name": "rewards",
            "type": "tuple[]"
          },
          {
            "internalType": "enum ProjectStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "rewardTokenAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "mainPhoto",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "secondaryPhotos",
            "type": "string[]"
          }
        ],
        "internalType": "struct Asset[]",
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
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "getAssetById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
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
            "name": "projectStartDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "projectEndDate",
            "type": "uint256"
          },
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
            "name": "rewards",
            "type": "tuple[]"
          },
          {
            "internalType": "enum ProjectStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "rewardTokenAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "mainPhoto",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "secondaryPhotos",
            "type": "string[]"
          }
        ],
        "internalType": "struct Asset",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getAssetsOfOwner",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "assetId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "author",
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
            "name": "projectStartDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "projectEndDate",
            "type": "uint256"
          },
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
            "name": "rewards",
            "type": "tuple[]"
          },
          {
            "internalType": "enum ProjectStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "rewardTokenAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "mainPhoto",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "secondaryPhotos",
            "type": "string[]"
          }
        ],
        "internalType": "struct Asset[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
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

const contractAddress = "0x0f5ED3b8049254c99879E6Cd31FD498772A72141";
// Dirección del proveedor de la red (RPC)
const rpcURL = "https://public-node.testnet.rsk.co";

// Crear una instancia del proveedor de la red
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// Cuenta que enviará la transacción
const privateKey = "30dbccd5b9934100c5e4ed422b0bea04a3b4eee5c34a044514557c6515aad348";
const wallet = new ethers.Wallet(privateKey, provider);

// Conectar al contrato RES4
const contract = new ethers.Contract(contractAddress, Abi, wallet);


// Llamar a la función addAsset
async function addAsset() {
  const price = 1000;
  const autor = "Autor del proyecto";
  const titulo = "Título del proyecto";
  const description = "Descripción del proyecto";
  const projectEndDate = Math.floor(Date.now() / 1000) + 3600; // Una hora desde ahora
  const to = "0x2F59A1cf89c1124c79A86118A9339772c7F63EAF";
  const tokenURI = "https://gateway.pinata.cloud/ipfs/QmUqRqGovxh6SJEuLn7erivo4yeuhiror4adjpQxwvwvd6"; // URI ficticio del proyecto
  const mainPhoto = "https://gateway.pinata.cloud/ipfs/QmNRZqKUfqNcdduuUBCvz4XfKFySWaLpnQhdJyiDjcUZQo";
  const secondaryPhotos = [
      "https://gateway.pinata.cloud/ipfs/QmTJwsMXiwRS5ooFAmfkPQ8Sz28SVGyhfMNZLGWUDkygX5"
  ];

  // Llamar a la función addAsset
  const tx = await contract.addAsset(price, autor, titulo, description, projectEndDate, to, tokenURI, mainPhoto, secondaryPhotos);
  console.log("Transaction hash:", tx.hash);

  // Esperar a que la transacción se confirme
  const receipt = await tx.wait();
  console.log("Asset added successfully!");

  // Buscar el evento AssetCreated en los logs de la transacción
  const event = receipt.events.find(event => event.event === 'AssetCreated');
  const assetId = event.args.assetId;
  console.log("Asset ID:", assetId.toString());
}


const ProjectStatus = {
  Started: 0,
  Funded: 1,
  Failed: 2,
  Completed: 3
};


// Llamar a la función addAsset primero y luego a addRewards
async function getAllAssets(status) {
  try {
    const assets = await contract.getAllAssets(status);
    console.log(assets)
  } catch (error) {
    console.error("Error:", error);
  }
}
async function updateAssetDescription(assetId, newDescription) {
  try {
      // Llamar a la función UpdateAsset del contrato con la nueva descripción
      const tx = await contract.UpdateAsset(assetId, "", [], newDescription);
      console.log("Transaction hash:", tx.hash);

      // Esperar a que la transacción se confirme
      const receipt = await tx.wait();
      console.log("Asset description updated successfully!");
  } catch (error) {
      console.error("Error:", error);
  }
}

// Llamar a la función updateAssetDescription con el assetId del activo que deseas actualizar y la nueva descripción
getAllAssets(ProjectStatus.Started);
