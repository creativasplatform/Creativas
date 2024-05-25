import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disconnect, setDisconnect] = useState(null);
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [authType, setAuthType] = useState(null); // Nuevo estado para el tipo de autenticación

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
    setAuthType
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
