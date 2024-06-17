import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import advertenciaicon from '../assets/advertencia.png';
import etherumicon from "../assets/etherum.png";
import rskicon from "../assets/RBTC-logo.png";
import flechadown from "../assets/flechadown.png";
import flechaup from "../assets/flechaup.png";
import useUser from '../hooks/user/useuser.jsx';
import { NETWORKS } from "../helpers/ChainsConfig.js";

export default function Chain() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoggedIn,
    IsValidChain,
    ChainUser,
    changeNetworkWallet
  } = useUser();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNetworkChange = async (chainId) => {
    try {
      await changeNetworkWallet(chainId);
      setIsOpen(false);
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };


  const RSK_TESTNET = Number(NETWORKS.RSK_TESTNET.chainId);
  const SEPOLIA_TESTNET = Number(NETWORKS.SEPOLIA_TESTNET.chainId);

  // Determina qué ícono mostrar inicialmente
  const initialIcon = () => {
    if (!isLoggedIn) return rskicon;
    if (!IsValidChain) return advertenciaicon;
    if (ChainUser === RSK_TESTNET) return rskicon;
    if (ChainUser === SEPOLIA_TESTNET) return etherumicon;
    return advertenciaicon; // fallback icon if none of the conditions match
  };

  return (
    <Dropdown onOpenChange={handleToggle}>
      <DropdownTrigger>
        <Button
          className="text-white bg-customblack hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
        >
          <img
            src={initialIcon()}
            className={`w-5 h-5 -mt-0.5 mr-2 ${initialIcon() === etherumicon ? "rounded-full" : ""}`}
          />
          <img
            src={isOpen ? flechaup : flechadown}
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-35" : "rotate-0"}`}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="text-white bg-gray-800 font-thin text-sm px-5 py-2.5 dark rounded-lg"
        aria-label="Action event example"
        css={{ position: "absolute", right: 0 }}
      >
        {/* Mostrar opción de cambio a Rootstock */}
        <DropdownItem
          className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg mb-4 mt-2 flex items-center"
          key="rsk"
          onClick={() => handleNetworkChange('RSK_TESTNET')} // Cambia a la red de Rootstock
          disabled={ChainUser === NETWORKS.RSK_TESTNET.chainId} // Deshabilita si ya está en esa red
          startContent={<img src={rskicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full -ml-4 mr-2" />}
        >
          Rootstock
        </DropdownItem>

        {/* Mostrar opción de cambio a Ethereum */}
        <DropdownItem
          className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg flex items-center"
          key="ethereum"
          onClick={() => handleNetworkChange('SEPOLIA_TESTNET')} // Cambia a la red de Ethereum (ejemplo)
          disabled={ChainUser === NETWORKS.SEPOLIA_TESTNET.chainId}
          startContent={<img src={etherumicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full -ml-4 mr-2" />}
        >
          Ethereum
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
