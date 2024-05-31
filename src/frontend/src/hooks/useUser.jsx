import { useCallback, useState, useEffect } from 'react';
import { providers } from 'ethers';
import { web3auth } from '../helpers/Web3authHelpers.js';
import { useUserContext } from '../context/userContext.jsx';
import { rLogin } from '../helpers/LoginHelpers.js';
import { ethers } from 'ethers';
const LOCAL_STORAGE_KEY = "walletConnection";

export const loginWallet = async () => {
  try {
    const { provider, disconnect } = await rLogin.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    // Determinar si la conexión se realizó a través de MetaMask
    const wallet_type = provider.isMetaMask ? 'MetaMask' : null;
    return { web3Provider, disconnect, address, signer, wallet_type };
  } catch (error) {
    console.error("Error logging in with wallet:", error);
    throw error;
  }
};
export const logoutWallet = async (disconnect) => {
  try {
    await disconnect();
    rLogin.clearCachedProvider();
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const useUser = () => {
  const {
    isLoggedIn, setIsLoggedIn,
    disconnect, setDisconnect,
    address, setAddress,
    signer, setSigner,
    authType, setAuthType,
    balance, setBalance
  } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const saveConnection = (authType, wallet_type) => {
    const connectionData = authType === 'wallet' ? { authType, wallet_type } : { authType };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(connectionData));
  };
  const clearConnection = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleLoginWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { web3Provider, disconnect, address, signer, wallet_type } = await loginWallet();
      setDisconnect(disconnect);
      setSigner(signer);
      setAddress(address);
      const balance = await web3Provider.getBalance(address);
      setBalance(balance.toString());
      setAuthType('wallet');
      setIsLoggedIn(true);
      saveConnection('wallet', wallet_type);
    } catch (error) {
      setError("Failed to login with wallet");
    } finally {
      setLoading(false);
    }
  }, [setDisconnect, setAddress, setIsLoggedIn, setSigner, setAuthType, setBalance]);

  const handleLoginWeb3Auth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const web3authProvider = await web3auth.connect();
      const web3Provider = new providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
      const balance = await web3Provider.getBalance(address);
      setBalance(balance.toString());
      setAuthType('web3auth');
      setIsLoggedIn(true);
      saveConnection('web3auth', null);
    } catch (error) {
      console.error("Error logging in with Web3Auth:", error);
      setError("Failed to login with Web3Auth");
    } finally {
      setLoading(false);
    }
  }, [setDisconnect, setSigner, setAddress, setAuthType, setIsLoggedIn, setBalance]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (authType === 'wallet' && disconnect) {
        await logoutWallet(disconnect);
      
      } else if (authType === 'web3auth') {
        await web3auth.logout();
      }
      clearConnection();
      setDisconnect(null);
      setAddress("");
      setSigner(null);
      setAuthType(null);
      setIsLoggedIn(false);
      setBalance(null);

    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [authType, disconnect, setDisconnect, setAddress, setSigner, setAuthType, setIsLoggedIn, setBalance]);

  const getUserInfo = async () => {
    if (authType === 'wallet') {
      try {
        const user = rLogin.showWalletInfo();
        return user;
      } catch (error) {
        console.error("Error getting user info:", error);
        setError("Failed to get user info");
        return null;
      }
    } else if (authType === 'web3auth') {
      try {
        const user = await web3auth.getUserInfo();
        return user;
      } catch (error) {
        console.error("Error getting user info:", error);
        setError("Failed to get user info");
        return null;
      }
    }
  };

  const restoreConnection = async () => {
    const connectionData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (connectionData) {
      const { authType, wallet_type } = connectionData;
      if (authType === 'wallet' && wallet_type === 'MetaMask') {
        try {
          // Intentar restaurar la conexión automáticamente con MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Conexión restaurada automáticamente con MetaMask");
        } catch (error) {
          console.error("Error al restaurar la conexión con MetaMask:", error);
          // Manejar el error si el usuario no da permiso para conectar automáticamente
        }
      } else if (authType === 'wallet') {
        console.log("Hola de nuevo"); // Otra lógica si la conexión es de otro tipo de billetera
      } else if (authType === 'web3auth') {
        if (web3auth.connected) {
          await handleLoginWeb3Auth();
        }
      }
    }
  };
  
  return {
    isLoggedIn,
    address,
    signer,
    authType,
    balance,
    loginWallet: handleLoginWallet,
    loginWeb3Auth: handleLoginWeb3Auth,
    logout: handleLogout,
    getUserInfo,
    restoreConnection,
    loading,

    error
  };
};

export default useUser;
