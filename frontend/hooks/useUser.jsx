// useUser.jsx
import { useCallback } from 'react';
import { providers } from 'ethers';
import { rLogin } from '../helpers/LoginHelpers.jsx';
import { useUserContext } from '../context/userContext.jsx';

export const loginWallet = () =>
  rLogin.connect()
    .then(({ provider, disconnect }) => {
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner(0);
      const getAddressPromise = signer.getAddress();
      return { disconnect, getAddressPromise, signer };
    })
    .catch(console.error);

export const logout = async (disconnect) => {
  await disconnect;
};

const useUser = () => {
  const { isLoggedIn, setIsLoggedIn, disconnect, setDisconnect, address, setAddress, signer, setSigner } = useUserContext();

  const handleLoginWallet = useCallback(() => {
    loginWallet()
      .then(({ disconnect, getAddressPromise, signer }) => {
        setDisconnect(disconnect);
        setSigner(signer);
        getAddressPromise.then(setAddress);
        setIsLoggedIn(true);
      });
  }, [setDisconnect, setAddress, setIsLoggedIn, setSigner]);

  const handleLogout = useCallback(() => {
    if (disconnect) {
      logout(disconnect).then(() => {
        setDisconnect(null);
        setAddress("");
        setSigner(null);
        setIsLoggedIn(false);
      });
    }
  }, [disconnect, setDisconnect, setAddress, setIsLoggedIn, setSigner]);

  return {
    isLoggedIn,
    address,
    signer,
    login: handleLoginWallet,
    logout: handleLogout
  };
};

export default useUser;
