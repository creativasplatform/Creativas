
// components/AuthComponent.js
import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';

const AuthComponent = () => {
  const { isLoggedIn, address, balance, loginWallet, loginWeb3Auth, logout, getUserInfo, restoreConnection } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        await restoreConnection();
      } catch (error) {
        console.error("Error initializing Web3Auth or restoring session:", error);
      } finally {
        setLoading(false);
      }
    };

    initWeb3Auth();
  }, [restoreConnection]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={loginWallet}>Login with Wallet</button>
          <button onClick={loginWeb3Auth}>Login with Web3Auth</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;