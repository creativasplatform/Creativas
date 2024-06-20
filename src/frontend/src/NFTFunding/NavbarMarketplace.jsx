import React, { useState, useCallback, useEffect } from 'react';
import CreativasLogo from '../assets/CreativasLogo2.png';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import explorerIcon from "../assets/explorer.png";
import useUser from '../hooks/user/useuser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';
// import useSignMessages from '../hooks/user/usesignsignatures.jsx';
// import useSignatureStorage from '../hooks/user/usestoragesignatures.jsx';
import walleticon from "../assets/wallet.png";
import googleicon from "../assets/google.png";
import Sidebar from './Sidebar';
import Chain from './SetChain.jsx';
import { useUserContext } from "../context/userContext.jsx";
import { useSpring, useTransition, animated } from '@react-spring/web';
import alert from "../assets/alert.png"
const Navbar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openModalConditionals, setOpenModalConditionals] = useState(false);
  const [web3authInitialized, setWeb3authInitialized] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // Nuevo estado
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const {
    isLoggedIn,
    address,
    logoutWallet,
    logout,
    authType,
    RloginResponse,
    loginWallet,
    loginWeb3Auth,
    restoreConnection,
    changeNetworkWallet,
    changeNetworkWeb3auth
  } = useUser();

  const { Provider } = useUserContext();
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [loadingTermCondition, setLoadingTermCondition] = useState(true);

  const modalLoginAnimation = useSpring({
    opacity: openLoginModal ? 1 : 0,
    transform: openLoginModal ? 'scale(1)' : 'scale(0.9)',
    config: { duration: 300 },
  });

  const modalConditionalsAnimation = useSpring({
    opacity: openModalConditionals ? 1 : 0,
    transform: openModalConditionals ? 'scale(1)' : 'scale(0.9)',
    config: { duration: 300 },
  });

=======
  // const [loading, setLoading] = useState(true);
  // const [needsSignature, setNeedsSignature] = useState(false);
>>>>>>> 7befdb194668663c4fe1607301519b1063e12ae3

  // const { signMessage, loading: signingLoading, error: signingError } = useSignMessages();
  // const { hasUserSignature, addUserSignature, error: signatureError } = useSignatureStorage();

<<<<<<< HEAD
  const handleTermsChange = (e) => {
    setIsTermsChecked(e.target.checked);
  };

  const handlePrivacyChange = (e) => {
    setIsPrivacyChecked(e.target.checked);
  };

  const checkUserSignature = useCallback(async () => {
    if (isLoggedIn && address) {
      const hasSignature = await hasUserSignature();
      if (!hasSignature) {
        handleOpenConditionsModal();
      }
    } else {
      console.error("Please log in with a wallet first.");
    }
  }, [isLoggedIn, address, hasUserSignature]);

  const handleAcceptTerms = useCallback(async () => {
    try {
      const result = await signMessage("Accept the terms and conditions");
      if (result && result.signature) {
        const response = await addUserSignature(result.signature);
        if (response) {
          setTermsAccepted(true);
        } else {
          console.error("Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [signMessage, addUserSignature]);
=======
  // const checkUserSignature = useCallback(async () => {
  //   if (isLoggedIn && address) {
  //     const hasSignature = await hasUserSignature();
  //     setNeedsSignature(!hasSignature);
  //     if (!hasSignature) {
  //       console.log("El usuario no ha firmado todavía");
  //     }
  //   }
  // }, [isLoggedIn, address, hasUserSignature]);

  // const handleAcceptTerms = useCallback(async () => {
  //   const result = await signMessage("Acepta los términos y condiciones");
  //   if (result && result.signature) {
  //     await addUserSignature(result.signature);
  //     setNeedsSignature(false);
  //   }
  // }, [signMessage, addUserSignature]);
>>>>>>> 7befdb194668663c4fe1607301519b1063e12ae3

  const handleCloseConditionsModal = async () => {
    setOpenModalConditionals(false);
    if (!termsAccepted) {
      await logout();
    }
  };

  useEffect(() => {
    if (termsAccepted) {
      handleCloseConditionsModal();
    }
  }, [termsAccepted]);

  
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
    console.log(address)
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenConditionsModal = () => {
    setOpenModalConditionals(true);
  };

  useEffect(() => {
    if (isLoggedIn && address) {
      checkUserSignature();
    }
  }, [isLoggedIn, address]);


  const handleLoginWallet = async () => {
    try {
      setOpenLoginModal(false);
      await loginWallet();
    } catch (error) {
      console.error("Error logging in with wallet:", error);
    }
  };

  const handleLoginWeb3Auth = async () => {
    try {
      setOpenLoginModal(false);
      await loginWeb3Auth();
      
    } catch (error) {
      console.error("Error logging in with Web3Auth:", error);
    }
  };

  useEffect(() => {
    const handleProviderChange = async () => {
      if (Provider) {
        const savedNetwork = localStorage.getItem('selectedNetwork');
        if (savedNetwork) {
          if (authType === "wallet") {
            await changeNetworkWallet(savedNetwork);
          } else if (authType === "web3auth") {
            await changeNetworkWeb3auth(savedNetwork);
          }
        } else {
          console.error("No saved network found");
        }
      }
    };

    handleProviderChange();
  }, [Provider, authType, changeNetworkWallet, changeNetworkWeb3auth]);


  return (
    <nav className="bg-customblack pt-8 relative">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center space-x-20 rtl:space-x-reverse mt-4">
          <img src={CreativasLogo} className="h-10 w-200" alt="Creativas Logo" />
          <button
            type="button"
            className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
            onClick={handleOpenLoginModal}
          >
            <img src={explorerIcon} className="h-4 w-4 mr-2" alt="Explorer Icon" />
            <span>Explorer</span>
          </button>
        </a>

        <div className="flex-grow flex items-center justify-center ml-12 mt-4 ">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10  bg-white  rounded-lg ",
              mainWrapper: "h-full",
              input: "text-small outline-none ",
              inputWrapper: "h-full font-thin text-white bg-customblack dark:bg-customblack border border-white rounded-lg ",
            }}
            placeholder="  Search projects..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
        <div className="hidden w-full md:block md:w-auto mr-12 mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">Funding</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">Portfolio</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white" aria-current="page">Marketplace</a>
            </li>
          </ul>
        </div>
        <div className="hidden w-full md:block md:w-auto mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 -mr-4">
            <li><Chain /></li>
            <li className="mb-2 md:mb-0">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleSidebar}
                    className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 flex items-center space-x-2"
                  >
                    <span className="truncate">{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</span>
                  </button>

                  {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                      <div className="relative">
                        <Sidebar onClose={closeSidebar} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleOpenLoginModal}
                >

                  <span>Log in</span>

                </button>


              )}
            </li>
          </ul>
        </div>
      </div>

      {openLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
          <animated.div style={modalLoginAnimation} className="relative w-full max-w-md">
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
                    <div className="w-2/4 h-[0.5px] bg-white"></div>
                    <span className="text-white text-sm">Or</span>
                    <div className="w-2/4 h-[0.5px] bg-white"></div>
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
          </animated.div>
        </div>

      )}

      {openModalConditionals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
          <animated.div style={modalConditionalsAnimation} className="relative w-full max-w-md">
            <div className="relative bg-gray-800 shadow-md dark:bg-gray-800 rounded-xl">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-700 ">
                <p className="text-lg text-white text-center font-medium ml-28" >Terms and Conditions</p>
                <button
                  type="button"
                  className="text-white bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseConditionsModal}
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
              <div className="p-6 space-y-6 bg-gray-800 rounded-xl mt-4">
                <div className='bg-[#202129] rounded-md p-1 h-[170px]'>
                  <img src={alert} alt="Alert Icon" className="absolute mt-20 ml-3.5 transform -translate-y-1/2 w-8 h-8" />
                  <p class="font-thin p-4 mb-3 -mt-2 ml-12 text-[#D5D6E1] dark:text-gray-200 text-sm">Please review our terms and conditions before using the <strong class="font-semibold text-white dark:text-white"> Creativas Platform. </strong>  We will ask for a signature with your wallet once you click continue to connect to the platform and accept the terms and conditions. Creativas is an experimental platform, please act consciously and at your own risk.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start ml-16 ">
                    <div className="flex items-center h-5 mt-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="termsCheck"
                          checked={isTermsChecked}
                          onChange={handleTermsChange}
                        />
                        <span
                          className="absolute  text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className='mt-1.5 -ml-2'>
                      <label htmlFor="terms" className="ms-2 text-sm font-medium text-white dark:text-gray-200 font-montserrat">I accept the <a className="text-secondary hover:underline dark:text-secondary">Terms and Conditions.</a></label>
                    </div>
                  </div>
                  <div className="flex items-start mb-5 ml-16">
                    <div className="flex items-center h-5">
                      <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="privacyCheck"
                          checked={isPrivacyChecked}
                          onChange={handlePrivacyChange}
                        />
                        <span
                          className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </label>  </div>
                    <div className='-mt-3 -ml-2'>
                      <label htmlFor="terms" className="ms-2 text-sm font-medium text-white dark:text-gray-200 font-montserrat">I accept the <a className="text-secondary hover:underline dark:text-secondary">Privacy Policy.</a></label>


                    </div>

                    <div className='mt-12 -ml-56'>
                      <button
                        onClick={handleAcceptTerms}
                        type="submit"
                        className="w-[300px] rounded border border-secondary bg-secondary p-1 text-white text-center text-sm transition hover:bg-secondary-ligth"
                        disabled={!isTermsChecked || !isPrivacyChecked}
                      >

                        Continue
                      </button>

                    </div>

                  </div>


                </div>

              </div>
            </div>
          </animated.div>
        </div>

      )}
    </nav>
  );
};

export default Navbar;
