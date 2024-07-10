import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import advertenciaicon from '../assets/advertencia.png';
import etherumicon from "../assets/etherum.png";
import rskicon from "../assets/RBTC-logo.png";
import flechadown from "../assets/flechadown.png";
import flechaup from "../assets/flechaup.png"
import check from "../assets/check.png";
import useUser from '../hooks/user/useuser.jsx';
import { NETWORKS } from "../helpers/ChainsConfig.js"
import { useUserContext } from "../context/userContext.jsx";

export default function Chain() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // Estado para mostrar el tooltip
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar hover
  const { isLoggedIn, IsValidChain, ChainUser, changeNetworkWallet, changeNetworkWeb3auth, authType } = useUser();
  const { network, setNetwork } = useUserContext();

  useEffect(() => {
    const savedNetwork = localStorage.getItem('selectedNetwork');
    if (savedNetwork) {
      setNetwork(savedNetwork);
    } else {
      setNetwork('RSK_TESTNET'); 
    }
  }, [setNetwork]);

  useEffect(() => {
    // Lógica para mostrar el tooltip si la red es incorrecta
    if (!IsValidChain && isLoggedIn) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [IsValidChain, isLoggedIn]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNetworkChange = async (chainId) => {
    try {
      if (authType === 'wallet') {
        await changeNetworkWallet(chainId);
      } else if (authType === 'web3auth') {
        await changeNetworkWeb3auth(chainId);
      }
      setNetwork(chainId); 
      localStorage.setItem('selectedNetwork', chainId); 
      setIsOpen(false);
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  const RSK_TESTNET = Number(NETWORKS.RSK_TESTNET.chainId);
  const SEPOLIA_TESTNET = Number(NETWORKS.SEPOLIA_TESTNET.chainId);

  const initialIcon = () => {
    if (!isLoggedIn && network === 'RSK_TESTNET') return rskicon;
    if (!isLoggedIn && network === 'SEPOLIA_TESTNET') return etherumicon;
    if (!isLoggedIn) return rskicon;
    if (!IsValidChain) return advertenciaicon;
    if (ChainUser === RSK_TESTNET) return rskicon;
    if (ChainUser === SEPOLIA_TESTNET) return etherumicon;
    return advertenciaicon;
  };

  return (
    <div className="relative">
      <Dropdown className="bg-gray-800" onOpenChange={handleToggle}>
        <DropdownTrigger>
          <Button 
            className="text-white bg-customblack hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-customblack dark:hover:bg-gray-600 dark:focus:ring-blue-800 flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
          <DropdownItem
            className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg mb-4 mt-2 flex items-center"
            key="rsk"
            onClick={() => handleNetworkChange('RSK_TESTNET')}
            endContent={network === 'RSK_TESTNET' && <img src={check} className={`w-4 h-4  ${network === 'RSK_TESTNET' ? '-mr-2' : ''}` } />}
            startContent={<img src={rskicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full -ml-4 -mr-2" />}
          >
            <p className={`${network === 'SEPOLIA_TESTNET' ? 'mr-20 ml-4' : 'mr-8 ml-4'}` }>Rootstock</p> 
          </DropdownItem>
          <DropdownItem
            className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg flex items-center"
            key="ethereum"
            onClick={() => handleNetworkChange('SEPOLIA_TESTNET')}
            endContent={network === 'SEPOLIA_TESTNET' && <img src={check} className="w-4 h-4 ml-16" />}
            startContent={<img src={etherumicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full  -ml-4 mr-2" />}
          >
            <p className={`${network === 'SEPOLIA_TESTNET' ? 'mr-18' : 'mr-16'}` }>Ethereum</p> 
          </DropdownItem> 
        </DropdownMenu>
      </Dropdown>
      {/* Tooltip */}
      {showTooltip && isHovered && (
        <div className="absolute whitespace-nowrap z-10 visible font-roboto inline-block transition-opacity duration-300t -top-12 -ml-14 px-3 py-2 text-sm font-medium text-white bg-[#1F2937] rounded-lg shadow-sm tooltip dark:bg-[#1F2937]">
          Current in an incorrect network
        </div>
      )}
    </div>
  );
}
