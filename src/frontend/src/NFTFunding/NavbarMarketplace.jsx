import React, { useState, useCallback, useEffect } from 'react';
import CreativasLogo from '../assets/CreativasLogo2.png';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import explorerIcon from "../assets/explorer.png";
import useUser from '../hooks/user/useuser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';
import useSignMessages from '../hooks/user/usesignsignatures.jsx';
import useSignatureStorage from '../hooks/user/usestoragesignatures.jsx';
import walleticon from "../assets/wallet.png";
import googleicon from "../assets/google.png";
import Chain from './SetChain.jsx';
import Sidebar from './Sidebar';
import { useUserContext } from "../context/userContext.jsx";
import { useSpring, useTransition, animated } from '@react-spring/web';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection, cn} from "@nextui-org/react";
import masicon from "../assets/mas2.png";
import nfts from "../assets/nfts.png";
import cubo from "../assets/cubo.png";
import alert from "../assets/alert.png"

const Navbar = ({ onSearch, searchTerm, onOpenModal }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openModalConditionals, setOpenModalConditionals] = useState(false);
  const [web3authInitialized, setWeb3authInitialized] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); 
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [loadingAcceptTerms, setLoadingAcceptTerms] = useState(false); 
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlelogout = async () => {
    await logout();
  } 

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearchChange = (event) => {
  
    onSearch(event.target.value); 
  };


  const { Provider } = useUserContext();
  const [loading, setLoading] = useState(true);

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


  const { signMessage, loading: signingLoading, error: signingError } = useSignMessages();
  const { hasUserSignature, addUserSignature, error: signatureError } = useSignatureStorage();

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
      setLoadingAcceptTerms(true); 

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
    } finally {
      setLoadingAcceptTerms(false); 
    }
  }, [signMessage, addUserSignature]);

  const handleCloseConditionsModal = async () => {
    setOpenModalConditionals(false);
    if (!termsAccepted) {
      await logout();
    }

    setTermsAccepted(false);
    setIsTermsChecked(false)
    setIsPrivacyChecked(false)
  };

  useEffect(() => {
    if (termsAccepted) {
      handleCloseConditionsModal();
    } else {
      console.error("Something was wrong")
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
          <Dropdown
      
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", 
        content: "p-0 border-small border-divider bg-primary",
    
      }}
    >
      <DropdownTrigger>
      <Button 
          variant='solid' 
          color='success'
          className='text-white hover:bg-secondary-ligth'
          radius="full"
          startContent={
            <img src={explorerIcon} alt='explorer' className='w-4 h-4'></img>
          }
        >
          Explorer
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-white",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Actions" showDivider classNames={{
          divider: "bg-white"
        }}>
          <DropdownItem key="dashboard"
              startContent={
                <img src={cubo} className='h-4 w-4' alt='cubo'></img>
              }
          >
           All projects
          </DropdownItem>
          <DropdownItem key="settings"
           startContent={
            <img src={nfts} className='h-4 w-4' alt='nfts'></img>
          }
          >Marketplace</DropdownItem>
          <DropdownItem
            key="new_project"
            onClick={onOpenModal}
            startContent={
              <img src={masicon} className='h-4 w-4' alt='masicon'></img>
            }
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider classNames={{
          divider: "bg-white"
        }}>
          <DropdownItem key="quick_search">
            Quick search
          </DropdownItem>
          
        </DropdownSection>  

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
        </DropdownSection> 
      </DropdownMenu>
    </Dropdown>
        </a>

        <div className="flex-grow flex items-center justify-center ml-12 mt-4">
      <Input
        color='default'
        variant='bordered'
        radius='md'
        classNames={{
          base: "max-w-full sm:max-w-[20rem] h-10 rounded-lg",
          mainWrapper: "h-full",
          input: "text-small outline-none",
          inputWrapper: "h-full font-thin text-white bg-customblack dark:bg-customblack rounded-lg",
        }}
        placeholder="Search by project name"
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
        <div className="hidden w-full md:block md:w-auto mr-12 mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" className="block px-2 text-base text-[#9398A7] rounded md:bg-transparent hover:text-white">Funding</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-base text-[#9398A7] rounded md:bg-transparent hover:text-white">Marketplace</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-base text-[#9398A7] rounded md:bg-transparent hover:text-white" aria-current="page">Portofolio</a>
            </li>
          </ul>
        </div>
        <div className="hidden w-full md:block md:w-auto mt-4" id="navbar-default">
          <ul className="font-thin flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 -mr-4">
         {!isSidebarOpen && (
                     <Chain />
                  )}
            <li className="mb-2 md:mb-0">
              {isLoggedIn ? (
                <div className="relative">

                  <button
                    type="button"
                    onClick={toggleSidebar}
                    className="text-white bg-customblack border border-green/5 hover:bg-gray-800 focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 flex items-center space-x-2"
                  >

                    <div className="-ml-6 text-white">
                      
                      <svg height="20" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                        <g style={{ transformOrigin: "center center" }}>
                          <circle cx="20" cy="20" fill="#B1E5E329" r="20"></circle>
                          <g transform="translate(6.666666666666666, 6.666666666666666) scale(0.5555555555555556)">
                            <path clipRule="evenodd" d="M21 6C21 4.34315 22.3431 3 24 3C25.6569 3 27 4.34315 27 6V15C27 16.6569 25.6569 18 24 18C22.3431 18 21 16.6569 21 15V6Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M21 33C21 31.3431 22.3431 30 24 30C25.6569 30 27 31.3431 27 33V42C27 43.6569 25.6569 45 24 45C22.3431 45 21 43.6569 21 42V33Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M42 21C43.6569 21 45 22.3431 45 24C45 25.6569 43.6569 27 42 27H33C31.3431 27 30 25.6569 30 24C30 22.3431 31.3431 21 33 21H42Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M15 21C16.6569 21 18 22.3431 18 24C18 25.6569 16.6569 27 15 27H6C4.34315 27 3 25.6569 3 24C3 22.3431 4.34315 21 6 21H15Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M34.6066 9.15076C35.7782 7.97918 37.6777 7.97918 38.8492 9.15076C40.0208 10.3223 40.0208 12.2218 38.8492 13.3934L36.7279 15.5147C35.5563 16.6863 33.6569 16.6863 32.4853 15.5147C31.3137 14.3431 31.3137 12.4437 32.4853 11.2721L34.6066 9.15076Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M11.2721 32.4853C12.4437 31.3137 14.3431 31.3137 15.5147 32.4853C16.6863 33.6569 16.6863 35.5563 15.5147 36.7279L13.3934 38.8492C12.2218 40.0208 10.3223 40.0208 9.15076 38.8492C7.97919 37.6777 7.97919 35.7782 9.15076 34.6066L11.2721 32.4853Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M38.8492 34.6066C40.0208 35.7782 40.0208 37.6777 38.8492 38.8492C37.6777 40.0208 35.7782 40.0208 34.6066 38.8492L32.4853 36.7279C31.3137 35.5563 31.3137 33.6569 32.4853 32.4853C33.6569 31.3137 35.5563 31.3137 36.7279 32.4853L38.8492 34.6066Z" fill="#B1E5E3" fillRule="evenodd"></path>
                            <path clipRule="evenodd" d="M15.5147 11.2721C16.6863 12.4437 16.6863 14.3431 15.5147 15.5147C14.3431 16.6863 12.4437 16.6863 11.2721 15.5147L9.15076 13.3934C7.97918 12.2218 7.97919 10.3223 9.15076 9.15076C10.3223 7.97918 12.2218 7.97918 13.3934 9.15076L15.5147 11.2721Z" fill="#B1E5E3" fillRule="evenodd"></path>
                          </g>
                        </g>
                      </svg>
                      
                    </div>
                    <span className="truncate text-sm">{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</span>


               
                  </button>

                  {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                      <div className="relative">
                        <Sidebar onClose={closeSidebar} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-600 dark:bg-gray-800  dark:hover:bg-gray-600  focus:outline-none font-thin rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    className="w-full px-4 py-2 text-sm font-thin text-black bg-[#19191E] rounded-lg hover:bg-gray-700 dark:[#19191E] dark:text-white dark:hover:bg-gray-700"
                    onClick={handleLoginWallet}
                  >
                    <img src={walleticon} className="inline-block w-4 h-4 mr-2" alt="Wallet Icon" />
                    Wallet
                  </button>

                  <div className="flex items-center justify-center space-x-4 mt-2">
                    <div className="w-2/4 h-[0.5px] bg-white"></div>
                    <span className="text-white text-sm">Or</span>
                    <div className="w-2/4 h-[0.5px] bg-white"></div>
                  </div>

                  <button
                    className="w-full px-4 py-2 text-sm font-thin text-black bg-[#19191E] rounded-lg hover:bg-gray-700 dark:[#19191E] dark:text-white dark:hover:bg-gray-700"
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
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full" style={{ zIndex: '100' }} >
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
                      disabled={!isTermsChecked || !isPrivacyChecked || loadingAcceptTerms} 
                    >
                      {loadingAcceptTerms ? (
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" />
                          </svg>
                          <span className="sr-only font-montserrat">Enviando...</span>
                        </div>
                      ) : (
                        'Continue'
                      )}
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