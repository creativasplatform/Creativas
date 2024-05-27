import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';


const AuthComponent = () => {
  const { isLoggedIn, address, balance, loginWallet, loginWeb3Auth, logout, getUserInfo } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        setLoading(false);
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
        setLoading(false);
      }
    };

    initWeb3Auth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const getInfo = async () => {
    const info = await getUserInfo();
    console.log(info);
  };

  return (
    <div>
      <p>Logged in: {isLoggedIn ? 'Yes' : 'No'}</p>
      <p>Address: {address}</p>
      <p>Balance: {balance && balance.toString()}</p>
      {!isLoggedIn ? (
        <div>
          <button onClick={loginWallet}>Login with Wallet</button>
          <button onClick={loginWeb3Auth}>Login with Web3Auth</button>
        </div>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <button onClick={getInfo}>Info</button>
    </div>
  );
};

export default AuthComponent;
