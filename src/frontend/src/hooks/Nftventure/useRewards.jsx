import { useState, useCallback } from 'react';
import { addRewards, getRewardsForAsset } from '../../views/Nftventure/Rewards.js';

export default function useRewards() {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState({
        adding: false,
        fetching: false
    });
    const [error, setError] = useState({
        adding: null,
        fetching: null
    });


    const createRewards = async (assetId, rewardsList) => {
        setLoading(prevLoading => ({ ...prevLoading, adding: true }));
        setError(prevError => ({ ...prevError, adding: null }));
        try {
            const result = await addRewards(assetId, rewardsList);
            return result;
        } catch (err) {
            setError(prevError => ({ ...prevError, adding: err }));
            throw err;
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, adding: false }));
        }
    };

    const fetchRewardsForAsset = useCallback(async (assetId) => {
        setLoading(prevLoading => ({ ...prevLoading, fetching: true }));
        setError(prevError => ({ ...prevError, fetching: null }));
        try {
            const rewardsData = await getRewardsForAsset(assetId);
            setRewards(rewardsData);
        } catch (err) {
            setError(prevError => ({ ...prevError, fetching: err }));
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, fetching: false }));
        }
    }, []);

    return {
        rewards,
        loadingAdding: loading.adding,
        errorAdding: error.adding,
        loadingFetching: loading.fetching,
        errorFetching: error.fetching,
        createRewards,
        fetchRewardsForAsset
    };
}
