// useUser.jsx
import { useCallback, useEffect } from 'react';
import { providers } from 'ethers';
import { rLogin } from '..//helpers/LoginHelpers.jsx';
import { useUserContext } from '../context/userContext.jsx';

export const login = () =>
  rLogin.connect()
    .then(({ provider, disconnect }) => {
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(0);
      const getAddressPromise = signer.getAddress();
      return { disconnect, getAddressPromise };
    })
    .catch(console.error);

export const logout = async (disconnect) => {
  await disconnect();
};

const useUser = () => {
  const { isLoggedIn, setIsLoggedIn, disconnect, setDisconnect, address, setAddress } = useUserContext();

  const handleLogin = useCallback(() => {
    login()
      .then(({ disconnect, getAddressPromise }) => {
        setDisconnect(disconnect);
        getAddressPromise.then(setAddress);
        setIsLoggedIn(true);
      });
  }, [setDisconnect, setAddress, setIsLoggedIn]);

  const handleLogout = useCallback(() => {
    if (disconnect) {
      logout(disconnect).then(() => {
        setDisconnect(null);
        setAddress("");
        setIsLoggedIn(false);
      });
    }
  }, [disconnect, setDisconnect, setAddress, setIsLoggedIn]);



  return {
    isLoggedIn,
    address,
    login: handleLogin,
    logout: handleLogout
  };
};

export default useUser;
