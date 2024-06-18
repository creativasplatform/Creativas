import { useCallback, useState, useEffect } from 'react';
import { providers } from 'ethers';
import { web3auth } from '../../helpers/Web3authHelpers.js';
import { useUserContext } from '../../context/userContext.jsx';
import { rLogin } from '../../helpers/LoginHelpers.js';
import { NETWORKS } from '../../helpers/ChainsConfig.js'; // Importa la configuración de las redes desde el archivo networkConfig.js

const LOCAL_STORAGE_KEY = "walletConnection";

export const loginWallet = async () => {
  try {
    const response = await rLogin.connect();
    const RloginResponder = response;
    const web3Provider = new providers.Web3Provider(RloginResponder.provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const wallet_type = RloginResponder.provider.isMetaMask ? 'MetaMask' : null;

    return { web3Provider, address, signer, wallet_type, RloginResponder };
  } catch (error) {
    console.error("Error logging in with wallet:", error);
    throw error;
  }
};

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

const useUser = () => {
  const {
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
  } = useUserContext();

  // Estados locales
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cadenas de bloques soportadas
  const supportedChains = [31, 11155111];

  // Guardar la conexión en el almacenamiento local
  const saveConnection = (authType, wallet_type) => {
    const connectionData = authType === 'wallet' ? { authType, wallet_type } : { authType };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(connectionData));
  };

  // Borrar la conexión del almacenamiento local
  const clearConnection = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };


  const changeNetworkWallet = useCallback(async (chainId) => {
    try {
      console.log(signer)
      console.log(Provider)
      if (!signer && !Provider) {
        console.log("Error aca")
        throw new Error("Please log in with a wallet first.");
      }

      console.log(chainId)

      const networkConfig = NETWORKS[chainId];
      if (!networkConfig) {
        throw new Error("Unsupported chainId.");
      }

      const currentNetwork = await Provider.provider.request({ method: "eth_chainId", });
      const currentChainId = parseInt(currentNetwork, 16);

      // Verificar si la red ya está presente en el proveedor de Web3
      if (currentChainId !== networkConfig.chainId) {
        // Si no está presente, intentar agregar la red
        const addParams = {
          chainId: '0x' + parseInt(networkConfig.chainId).toString(16),
          chainName: networkConfig.chainName,
          rpcUrls: networkConfig.rpcUrls,
          blockExplorerUrls: networkConfig.blockExplorerUrls,
          nativeCurrency: networkConfig.nativeCurrency,
        };

        try {
          await Provider.provider.request({
            method: 'wallet_addEthereumChain',
            params: [addParams],
          });
        } catch (addError) {
          console.error("Failed to add network:", addError);
          throw new Error("Failed to add network. Please check your wallet settings.");
        }
      }

      // Switching network
      await Provider.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkConfig.chainId.toString(16)}` }],
      });

      // Obtener la dirección y saldo actualizados en la nueva red
      const newAddress = await signer.getAddress();
      const newBalance = await Provider.getBalance(newAddress);

      // Actualizar context con la información de la nueva red
      setAddress(newAddress);
      setBalance(newBalance.toString());
      setIsValidChain(true);
      setChainUser(networkConfig.chainId);
      const wallet_type = Provider.provider.isMetaMask ? 'MetaMask' : null;
      saveConnection('wallet', wallet_type);
      setError(null);
    } catch (error) {
      console.error("Error switching network:", error);
      setError("Failed to switch network.");
    }
  }, [signer, Provider, setAddress, setBalance, setIsValidChain, setChainUser, setError]);

  // Manejar el inicio de sesión con la billetera
  const handleLoginWallet = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { web3Provider, address, signer, wallet_type, RloginResponder } = await loginWallet();
      await setSigner(signer);
      await setProvider(web3Provider);
      await setAddress(address);
      const balance = await web3Provider.getBalance(address);
      await setBalance(balance.toString());
      await setAuthType('wallet');
      await setIsLoggedIn(true);
      saveConnection('wallet', wallet_type);
      await setRloginResponse(RloginResponder);


      const network = await web3Provider.getNetwork();
      const isValidChain = supportedChains.includes(network.chainId);
      setIsValidChain(isValidChain);

      // Solo actualizar la cadena si es válida
      if (isValidChain) {
        setChainUser(network.chainId);
      }

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
        const isValidChain = supportedChains.includes(Number(chainId));
        setIsValidChain(isValidChain);

        if (isValidChain) {
          setChainUser(Number(chainId));
        }
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
  }, [setAddress, setIsLoggedIn, setSigner, setAuthType, setBalance, setRloginResponse, setChainUser, setProvider]);

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
      setProvider(web3Provider)
    } catch (error) {
      setError("Failed to login with Web3Auth");
    } finally {
      setLoading(false);
    }
  }, [setSigner, setAddress, setAuthType, setIsLoggedIn, setBalance, setProvider]);

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
      setProvider(null)
      setAddress("");
      setSigner(null);
      setAuthType(null);
      setIsLoggedIn(false);
      setBalance(null);
      setIsValidChain(true);
      setChainUser(null)
    } catch (error) {
      setError("Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [authType, RloginResponse, setAddress, setSigner, setAuthType, setIsLoggedIn, setBalance, setRloginResponse, setProvider]);

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
              setProvider(web3Provider)
              const wallet_type = web3Provider.provider.isMetaMask ? 'MetaMask' : null;
              saveConnection('wallet', wallet_type);


              const network = await web3Provider.getNetwork();
              const isValidChain = supportedChains.includes(network.chainId);
              setIsValidChain(isValidChain);


              // Solo actualizar la cadena si es válida
              if (isValidChain) {
                setChainUser(network.chainId);
              }


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
                const isValidChain = supportedChains.includes(Number(chainId));
                setIsValidChain(isValidChain);


                // Solo actualizar la cadena si es válida
                if (isValidChain) {
                  setChainUser(Number(chainId));
                }
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
    Provider,
    authType,
    balance,
    IsValidChain,
    ChainUser,
    RloginResponse,
    logoutWallet,
    changeNetworkWallet,
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
