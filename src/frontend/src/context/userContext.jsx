import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [RloginResponse, setRloginResponse] = useState(null); 
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [Provider, setProvider] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [balance, setBalance] = useState(null);
  const [IsValidChain, setIsValidChain] = useState(true);
  const [ChainUser, setChainUser] = useState(null);
  const [network, setNetwork] = useState(null);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    RloginResponse,
    setRloginResponse,
    address,
    setAddress,
    signer,
    setSigner,
    Provider,
    setProvider,
    authType,
    setAuthType,
    balance,
    setBalance,
    IsValidChain,
    setIsValidChain,
    ChainUser,
    setChainUser,
    network,
    setNetwork

  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
