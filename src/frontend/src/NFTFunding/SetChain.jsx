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
  const { isLoggedIn, IsValidChain, ChainUser, changeNetworkWallet, changeNetworkWeb3auth, authType } = useUser();
  const { network, setNetwork } = useUserContext();

  useEffect(() => {
    // Leer la red seleccionada del localStorage al montar el componente
    const savedNetwork = localStorage.getItem('selectedNetwork');
    if (savedNetwork) {
      setNetwork(savedNetwork);
    } else {
      setNetwork('RSK_TESTNET'); // Default to Rootstock if no network is saved
    }
  }, [setNetwork]);
  

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
      setNetwork(chainId); // Update the network context
      localStorage.setItem('selectedNetwork', chainId); // Save the selected network to localStorage
      setIsOpen(false);
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  const RSK_TESTNET = Number(NETWORKS.RSK_TESTNET.chainId);
  const SEPOLIA_TESTNET = Number(NETWORKS.SEPOLIA_TESTNET.chainId);


  // Determine the initial icon to show
  const initialIcon = () => {
    if (!isLoggedIn && network === 'RSK_TESTNET') return rskicon;
    if (!isLoggedIn && network === 'SEPOLIA_TESTNET') return etherumicon;
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
        <DropdownItem
      className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg mb-4 mt-2 flex items-center"
      key="rsk"
      onClick={() => handleNetworkChange('RSK_TESTNET')}
      endContent={network === 'RSK_TESTNET' && <img src={check} className={`"w-4 h-4  ${network === 'RSK_TESTNET' ? '-mr-2' : ''}` } />}
      startContent={<img src={rskicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full -ml-4 -mr-2" />}
    >
     <p className={`${network === 'SEPOLIA_TESTNET' ? 'mr-20' : 'mr-4 ml-4'}` }>Rootstock</p> 
    </DropdownItem>
    <DropdownItem
      className="text-lg hover:bg-gray-600 focus:outline-none rounded-lg flex items-center"
      key="ethereum"
      onClick={() => handleNetworkChange('SEPOLIA_TESTNET')}
      endContent={network === 'SEPOLIA_TESTNET' && <img src={check} className="w-4 h-4 ml-16" />}
      startContent={<img src={etherumicon} className="w-6 h-6 text-xl text-white pointer-events-none flex-shrink-0 rounded-full  -ml-4 mr-2" />}
    >
     <p className={`${network === 'SEPOLIA_TESTNET' ? 'mr-18' : 'mr-16'}` }>Ethereum</p> 
    </DropdownItem> Aca que puede suceder con los estilos por que al renderizarce el icon check en alguno de las 2 opciones se me daña los estilos de la otra de esta forma. La forma se puede ver en la imagen se daña la otra opcion

      </DropdownMenu>
    </Dropdown>
  );
}
