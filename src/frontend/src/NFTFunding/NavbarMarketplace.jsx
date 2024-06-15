import React, { useState, useCallback, useEffect } from 'react';
import CreativasLogo from '../assets/CreativasLogo2.png';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import explorerIcon from "../assets/explorer.png";
import useUser from '../hooks/user/useuser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';
import useSignMessages from '../hooks/user/usesignsignatures.jsx';
import useSignatureStorage from '../hooks/user/usestoragesignatures.jsx';
import walleticon from "../assets/wallet.png"
import googleicon from "../assets/google.png"


const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [web3authInitialized, setWeb3authInitialized] = useState(false);
  const {
    isLoggedIn,
    address,
    balance,
    logoutWallet,
    authType,
    RloginResponse,
    loginWallet,
    loginWeb3Auth,
    logout,
    restoreConnection,
    IsValidChain,
  } = useUser();
  const [loading, setLoading] = useState(true);
  const [needsSignature, setNeedsSignature] = useState(false);

  const { signMessage, loading: signingLoading, error: signingError } = useSignMessages();
  const { hasUserSignature, addUserSignature, error: signatureError } = useSignatureStorage();

  const checkUserSignature = useCallback(async () => {
    if (isLoggedIn && address) {
      const hasSignature = await hasUserSignature();
      setNeedsSignature(!hasSignature);
      if (!hasSignature) {
        console.log("El usuario no ha firmado todavía");
      }
    }
  }, [isLoggedIn, address, hasUserSignature]);

  const handleAcceptTerms = useCallback(async () => {
    const result = await signMessage("Acepta los términos y condiciones");
    if (result && result.signature) {
      await addUserSignature(result.signature);
      setNeedsSignature(false);
    }
  }, [signMessage, addUserSignature]);

  useEffect(() => {
    const initWeb3Auth = async () => {
      if (web3authInitialized) return;

      try {
        await web3auth.initModal();
        setWeb3authInitialized(true);
        await restoreConnection();
      } catch (error) {
        console.error("Error initializing Web3Auth or restoring session:", error);
      } finally {
        setLoading(false);
      }
    };

    initWeb3Auth();
  }, [restoreConnection, web3authInitialized]);

  useEffect(() => {
    const cleanup = () => {
      if (authType === 'wallet' && RloginResponse) {
        logoutWallet(RloginResponse);
      }
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [authType, RloginResponse, logoutWallet]);


  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleLoginWallet = async () => {
    try {
      setOpenLoginModal(false);
      await loginWallet();
      checkUserSignature();
    } catch (error) {
      console.error("Error logging in with wallet:", error);
    }
  };

  const handleLoginWeb3Auth = async () => {
    try {
      setOpenLoginModal(false);
      await loginWeb3Auth();
      checkUserSignature();
    } catch (error) {
      console.error("Error logging in with Web3Auth:", error);
    }
  };

  if (loading || signingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-customblack pt-8 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center space-x-20 rtl:space-x-reverse mt-4">
          <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
          <button
            type="button"
            className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
            onClick={handleOpenLoginModal}
          >
            <img src={explorerIcon} className="h-4 w-4 mr-2" alt="Explorer Icon" />
            <span>Explorer</span>
          </button>
        </a>

        <div className="flex-grow flex items-center justify-center ml-12 mt-4">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10 rounded-md bg-white",
              mainWrapper: "h-full",
              input: "text-small outline-none",
              inputWrapper: "h-full font-thin text-default-500 bg-customblack dark:bg-customblack border border-white",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
        <div className="hidden w-full md:block md:w-auto mr-12 mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">Community</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">FAQ</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white" aria-current="page">About us</a>
            </li>
          </ul>
        </div>
        <div className="hidden w-full md:block md:w-auto mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="mb-2 md:mb-0">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="text-white  bg-gray-800 hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={logout}
                >
                  Log out
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white  bg-gray-800 hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleOpenLoginModal}
                >
                  Log in
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {openLoginModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
  <div className="relative w-full max-w-md ">
    <div className="relative bg-gray-800 shadow-md dark:bg-gray-800 rounded-xl">
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-700 ">
        <p className="text-lg text-white font-thin">Welcome again</p>
        <button
          type="button"
          className="text-white bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCloseLoginModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div className="p-6 space-y-6 bg-gray-800 rounded-xl">
        <p className="text-center text-lg text-white font-thin">Log in</p>
        <div className="space-y-4">
          <button
            className="w-full px-4 py-2 text-sm font-thin text-white bg-[#19191E] rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-600 dark:hover:bg-gray-600"
            onClick={handleLoginWallet}
          >
            <img src={walleticon} className="inline-block w-4 h-4 mr-2" alt="Wallet Icon" />
            Wallets
          </button>
          

          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="w-2/4 h-[0.5px] bg-gray-600"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="w-2/4 h-[0.5px] bg-gray-600"></div>
          </div>

          <button
            className="w-full px-4 py-2 text-sm font-thin text-white bg-[#19191E] rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-600 dark:hover:bg-gray-600"
            onClick={handleLoginWeb3Auth}
          >
            <img src={googleicon} className="inline-block w-4 h-4 mr-2" alt="Google Icon" />
            Google
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

 
     
      )}
    </nav>
  );
};

export default Navbar;
