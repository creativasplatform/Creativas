import { useCallback, useState, useEffect } from 'react';
import { providers } from 'ethers';
import { web3auth } from '../helpers/Web3authHelpers.js';
import { useUserContext } from '../context/userContext.jsx';
import { rLogin } from '../helpers/LoginHelpers.jsx';

export const loginWallet = async () => {
  try {
    const { provider, disconnect } = await rLogin.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    return { web3Provider, disconnect, address, signer };
  } catch (error) {
    console.error("Error logging in with wallet:", error);
    throw error;
  }
};

export const logoutWallet = async (disconnect) => {
  try {
    await disconnect;
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

  const handleLoginWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { web3Provider, disconnect, address, signer } = await loginWallet();
      setDisconnect(disconnect);
      setSigner(signer);
      setAddress(address);
      const balance = await web3Provider.getBalance(address);
      setBalance(balance.toString());
      setAuthType('wallet');
      setIsLoggedIn(true);
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
    }
     else if (authType === 'web3auth') {
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
    loading,
    error
  };
};

export default useUser;
