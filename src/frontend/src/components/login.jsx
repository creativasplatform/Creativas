// import React, { useEffect, useState } from 'react';
// import useUser from '../hooks/useUser.jsx';
// import { web3auth } from '../helpers/Web3authHelpers.js';


// const AuthComponent = () => {
//   const { isLoggedIn, address, balance, loginWallet, loginWeb3Auth, logout, getUserInfo } = useUser();
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const initWeb3Auth = async () => {
//   //     try {
//   //       await web3auth.initModal();
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error initializing Web3Auth:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   initWeb3Auth();
//   // }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const getInfo = async () => {
//     const info = await getUserInfo();
//     console.log(info);
//   };

//   return (
//     <div>
//       <p>Logged in: {isLoggedIn ? 'Yes' : 'No'}</p>
//       <p>Address: {address}</p>
//       <p>Balance: {balance && balance.toString()}</p>
//       {!isLoggedIn ? (
//         <div>
//           <button onClick={loginWallet}>Login with Wallet</button>
//           <button onClick={loginWeb3Auth}>Login with Web3Auth</button>
//         </div>
//       ) : (
//         <button onClick={logout}>Logout</button>
//       )}
//       <button onClick={getInfo}>Info</button>
//     </div>
//   );
// };

// export default AuthComponent;

// components/AuthComponent.js
import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser.jsx';
import { web3auth } from '../helpers/Web3authHelpers.js';
import useSignMessages from '../hooks/user/usesignsignatures.jsx'; // Asegúrate de importar el hook de firma de mensajes
import useSignatureStorage from '../hooks/user/usestoragesignatures.jsx'; // Asegúrate de importar el hook de manejo de firmas

const AuthComponent = () => {
  const {
    isLoggedIn,
    address,
    balance,
    logoutWallet,
    authType,
    RloginResponse,
    loginWallet,
    loginWeb3Auth,
    logout,
    restoreConnection,
    IsValidChain
  } = useUser();
  const [loading, setLoading] = useState(true);
  const [needsSignature, setNeedsSignature] = useState(false);

  const { signMessage, loading: signingLoading, error: signingError } = useSignMessages();
  const { hasUserSignature, addUserSignature, error: signatureError } = useSignatureStorage();

  const checkUserSignature = useCallback(async () => {
    if (isLoggedIn && address) {
      const hasSignature = await hasUserSignature();
      setNeedsSignature(!hasSignature);
    }
  }, [isLoggedIn, address, hasUserSignature]);

  const handleAcceptTerms = useCallback(async () => {
    const result = await signMessage("Acepta los terminos y condiciones");
    if (result && result.signature) {
      await addUserSignature(result.signature);
      setNeedsSignature(false); // Update state to hide the accept button
    }
  }, [signMessage, addUserSignature]);

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

  useEffect(() => {
    const cleanup = () => {
      if (authType === 'wallet' && RloginResponse) {
        logoutWallet(RloginResponse);
      }
    };

    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('beforeunload', cleanup);
    };
  }, [authType, RloginResponse, logoutWallet]);

  useEffect(() => {
    if (isLoggedIn) {
      checkUserSignature();
    }
  }, [isLoggedIn, checkUserSignature]);

  if (loading || signingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance}</p>
          <button onClick={logout}>Logout</button>
          {needsSignature && (
            <button onClick={handleAcceptTerms}>Aceptar Términos y Condiciones</button>
          )}
          {signingError && <p style={{ color: 'red' }}>{signingError.message}</p>}
          {signatureError && <p style={{ color: 'red' }}>{signatureError.message}</p>}
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