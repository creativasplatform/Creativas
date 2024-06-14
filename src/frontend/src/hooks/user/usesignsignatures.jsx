import { useState, useCallback } from 'react';
import { useUserContext } from '../../context/userContext.jsx';

const useSignMessages = () => {
  const { signer, address } = useUserContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);

    if (!signer) {
      setError('No signer available');
      setLoading(false);
      return null;
    }

    try {
      const signature = await signer.signMessage(message);
      return { address, message, signature };
    } catch (error) {
      console.error('Error signing message:', error);
      setError('Failed to sign message');
      return null;
    } finally {
      setLoading(false);
    }
  }, [signer, address]);

  return { signMessage, loading, error };
};

export default useSignMessages;
