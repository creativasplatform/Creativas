import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disconnect, setDisconnect] = useState(null);
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [balance, setBalance] = useState(null);


  const value = {
    isLoggedIn,
    setIsLoggedIn,
    disconnect,
    setDisconnect,
    address,
    setAddress,
    signer,
    setSigner,
    authType,
    setAuthType,
    balance,
    setBalance
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
