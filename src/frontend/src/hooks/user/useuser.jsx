import { useCallback, useState, useEffect } from 'react';
import { providers } from 'ethers';
import { web3auth } from '../../helpers/Web3authHelpers.js';
import { useUserContext } from '../../context/userContext.jsx';
import { rLogin } from '../../helpers/LoginHelpers.js';

const LOCAL_STORAGE_KEY = "walletConnection";


// Definir la red RSK Testnet
const RSK_TESTNET_CHAIN = {
  chainId: '0x1F', // Hexadecimal de 31
  chainName: 'RSK Testnet',
  nativeCurrency: {
    name: 'Test RSK Bitcoin',
    symbol: 'tRBTC',
    decimals: 18,
  },
  rpcUrls: ['https://public-node.testnet.rsk.co'],
  blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
};


export const loginWallet = async () => {
  try {
    const response = await rLogin.connect();
    const RloginResponder = response;
    const web3Provider = new providers.Web3Provider(RloginResponder.provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const wallet_type = RloginResponder.provider.isMetaMask ? 'MetaMask' : null;

    const chainIdHex = RSK_TESTNET_CHAIN.chainId;
    const chainId = parseInt(chainIdHex, 16);
    const currentChainId = parseInt(await RloginResponder.provider.request({ method: 'eth_chainId' }), 16);

    if (chainId !== currentChainId) {
      try {
        await RloginResponder.provider.request({
          method: 'wallet_addEthereumChain',
          params: [RSK_TESTNET_CHAIN],
        });
      } catch (addError) {
        console.log("Error adding RSK Testnet network: " + addError.message);
        throw new Error("Error adding RSK Testnet network. Please switch to the supported network.");
      }
    }

    return { web3Provider, address, signer, wallet_type, RloginResponder };
  } catch (error) {
    console.error("Error logging in with wallet:", error);
    throw error;
  }
};

// Función para cerrar sesión en la billetera
export const logoutWallet = async (response) => {
  try {
    if (response?.provider?.removeAllListeners) {
      response.provider.removeAllListeners('accountsChanged');
      response.provider.removeAllListeners('chainChanged');
      response.provider.removeAllListeners('disconnect');
    }
    await response.disconnect();
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Hook personalizado para gestionar el usuario
const useUser = () => {
  // Obtener variables y funciones del contexto de usuario
  const {
    isLoggedIn,
    setIsLoggedIn,
    RloginResponse,
    setRloginResponse,
    address,
    setAddress,
    signer,
    setSigner,
    authType,
    setAuthType,
    balance,
    setBalance,
    IsValidChain,
    setIsValidChain,
  } = useUserContext();

  // Estados locales
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cadenas de bloques soportadas
  const supportedChains = [31];

  // Guardar la conexión en el almacenamiento local
  const saveConnection = (authType, wallet_type) => {
    const connectionData = authType === 'wallet' ? { authType, wallet_type } : { authType };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(connectionData));
  };

  // Borrar la conexión del almacenamiento local
  const clearConnection = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Manejar el inicio de sesión con la billetera
  const handleLoginWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { web3Provider, address, signer, wallet_type, RloginResponder } = await loginWallet();
      setSigner(signer);
      setAddress(address);
      const balance = await web3Provider.getBalance(address);
      setBalance(balance.toString());
      setAuthType('wallet');
      setIsLoggedIn(true);
      saveConnection('wallet', wallet_type);
      setRloginResponse(RloginResponder);

      // Manejar eventos de cambio de cuentas y cadenas
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
          return handleLogout();
        }
        const newAddress = accounts[0];
        setAddress(newAddress);
        const newBalance = await web3Provider.getBalance(newAddress);
        setBalance(newBalance.toString());
      };

      const handleChainChanged = async (chainId) => {
        setIsValidChain(supportedChains.includes(Number(chainId)));
      };

      const handleDisconnect = () => handleLogout();

      // Guardar listeners en variables
      RloginResponder.provider.on('accountsChanged', handleAccountsChanged);
      RloginResponder.provider.on('chainChanged', handleChainChanged);
      RloginResponder.provider.on('disconnect', handleDisconnect);

    } catch (error) {
      console.error(error);
      setError("Failed to login with wallet");
    } finally {
      setLoading(false);
    }
  }, [setAddress, setIsLoggedIn, setSigner, setAuthType, setBalance, setRloginResponse]);

  // Manejar el inicio de sesión con Web3Auth
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
      setIsValidChain(true);
      setRloginResponse(null);
    } catch (error) {
      setError("Failed to login with Web3Auth");
    } finally {
      setLoading(false);
    }
  }, [setSigner, setAddress, setAuthType, setIsLoggedIn, setBalance]);

  // Manejar el cierre de sesión
  const handleLogout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (authType === 'wallet' && RloginResponse) {
        await logoutWallet(RloginResponse);
      } else if (authType === 'web3auth') {
        await web3auth.logout();
      }
      clearConnection();
      setRloginResponse(null);
      setAddress("");
      setSigner(null);
      setAuthType(null);
      setIsLoggedIn(false);
      setBalance(null);
      setIsValidChain(true);
    } catch (error) {
      setError("Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [authType, RloginResponse, setAddress, setSigner, setAuthType, setIsLoggedIn, setBalance, setRloginResponse]);

  // Obtener información del usuario
  const getUserInfo = async () => {
    if (authType === 'wallet') {
      try {
        const user = rLogin.showWalletInfo();
        return user;
      } catch (error) {
        setError("Failed to get user info");
        return null;
      }
    } else if (authType === 'web3auth') {
      try {
        const user = await web3auth.getUserInfo();
        return user;
      } catch (error) {
        setError("Failed to get user info");
        return null;
      }
    }
  };

  // Restaurar la conexión al cargar el componente
  const restoreConnection = async () => {
    setLoading(true);
    const connectionData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (connectionData) {
      const { authType, wallet_type } = connectionData;
      try {
        if (authType === 'wallet' && wallet_type === 'MetaMask') {
          if (window.ethereum) {
            if (window.ethereum.isConnected()) {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const web3Provider = new providers.Web3Provider(window.ethereum);
              const signer = web3Provider.getSigner();
              const address = await signer.getAddress();
              const balance = await web3Provider.getBalance(address);
              setSigner(signer);
              setAddress(address);
              setBalance(balance.toString());
              setAuthType('wallet');
              setIsLoggedIn(true);

              const network = await web3Provider.getNetwork();
              setIsValidChain(supportedChains.includes(network.chainId));

              // Manejar eventos de cambio de cuentas y cadenas
              const handleAccountsChanged = async (accounts) => {
                if (accounts.length === 0) {
                  return handleLogout();
                }
                const newAddress = accounts[0];
                setAddress(newAddress);
                const newBalance = await web3Provider.getBalance(newAddress);
                setBalance(newBalance.toString());
              };

              const handleChainChanged = async (chainId) => {
                setIsValidChain(supportedChains.includes(Number(chainId)));
              };

              const handleDisconnect = () => handleLogout();

              // Eliminar listeners anteriores para evitar duplicados
              if (window.ethereum.removeAllListeners) {
                window.ethereum.removeAllListeners('accountsChanged');
                window.ethereum.removeAllListeners('chainChanged');
                window.ethereum.removeAllListeners('disconnect');
              }

              // Agregar listeners
              window.ethereum.on('accountsChanged', handleAccountsChanged);
              window.ethereum.on('chainChanged', handleChainChanged);
              window.ethereum.on('disconnect', handleDisconnect);
              setLoading(false);
            } else {
              clearConnection()
              setLoading(false);

            }
          } else if (authType === 'web3auth') {
            await handleLoginWeb3Auth();
            setIsValidChain(true);
            setLoading(false);
          }

        } else {
          clearConnection()
          setLoading(false);
        }
      } catch (error) {
        clearConnection();
        setLoading(false);
      }
    }
  };


  return {
    isLoggedIn,
    address,
    signer,
    authType,
    balance,
    IsValidChain,
    RloginResponse,
    logoutWallet,
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
