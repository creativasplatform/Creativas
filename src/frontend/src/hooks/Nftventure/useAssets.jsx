import { useState, useEffect, useCallback } from 'react';
import { getAssets, getAssetById, getAssetsOfOwner, addAsset, updateAsset, getAllAssetsByCategory } from '../../views/Nftventure/Assets.js';
import { ProjectStatus } from '../../helpers/AssetsHelpers.js';
import { useUserContext } from '../../context/userContext.jsx';

export default function useAssets() {
    const [startedAssets, setStartedAssets] = useState([]);
    const [startedInvestmentAmounts, setStartedInvestmentAmounts] = useState([]);
    const [startedInvestorCounts, setStartedInvestorCounts] = useState([]);

    const [fundedAssets, setFundedAssets] = useState([]);
    const [fundedInvestmentAmounts, setFundedInvestmentAmounts] = useState([]);
    const [fundedInvestorCounts, setFundedInvestorCounts] = useState([]);

    const [failedAssets, setFailedAssets] = useState([]);
    const [failedInvestmentAmounts, setFailedInvestmentAmounts] = useState([]);
    const [failedInvestorCounts, setFailedInvestorCounts] = useState([]);

    const [completedAssets, setCompletedAssets] = useState([]);
    const [completedInvestmentAmounts, setCompletedInvestmentAmounts] = useState([]);
    const [completedInvestorCounts, setCompletedInvestorCounts] = useState([]);


    const [ownerAssets, setOwnerAssets] = useState([]);
    const [loading, setLoading] = useState({
        started: true,
        funded: true,
        failed: true,
        completed: true,
        adding: false,
        updating: false,
        fetchingAsset: false,
        fetchingOwnerAssets: false
    });
    const [error, setError] = useState({
        started: null,
        funded: null,
        failed: null,
        completed: null,
        adding: null,
        updating: null,
        fetchingAsset: null,
        fetchingOwnerAssets: null
    });
    const [asset, setAsset] = useState(null);

    const { signer, address } = useUserContext();


    useEffect(() => {
        const fetchAssets = async (status, setAssets, setInvestmentAmounts, setInvestorCounts, loadingKey, errorKey) => {
            setLoading(prevLoading => ({ ...prevLoading, [loadingKey]: true }));
            setError(prevError => ({ ...prevError, [errorKey]: null }));
            try {
                const { assets, investmentAmounts, investorCounts } = await getAssets(status);

                setAssets(assets);
                setInvestmentAmounts(investmentAmounts);
                setInvestorCounts(investorCounts);

            } catch (err) {

                setError(prevError => ({ ...prevError, [errorKey]: err }));
            } finally {
                setLoading(prevLoading => ({ ...prevLoading, [loadingKey]: false }));
            }
        };

        fetchAssets(ProjectStatus.Started, setStartedAssets, setStartedInvestmentAmounts, setStartedInvestorCounts, 'started', 'started');
        fetchAssets(ProjectStatus.Funded, setFundedAssets, setFundedInvestmentAmounts, setFundedInvestorCounts, 'funded', 'funded');
        fetchAssets(ProjectStatus.Failed, setFailedAssets, setFailedInvestmentAmounts, setFailedInvestorCounts, 'failed', 'failed');
        fetchAssets(ProjectStatus.Completed, setCompletedAssets, setCompletedInvestmentAmounts, setCompletedInvestorCounts, 'completed', 'completed');
    }, []);

    const createAsset = async (
        price,
        author,
        title,
        description,
        projectEndDate,
        to,
        tokenURI,
        mainPhoto,
        secondaryPhotos,
        category
    ) => {
        setLoading(prevLoading => ({ ...prevLoading, adding: true }));
        setError(prevError => ({ ...prevError, adding: null }));
        try {
            const result = await addAsset(
                price,
                author,
                title,
                description,
                projectEndDate,
                to,
                tokenURI,
                mainPhoto,
                secondaryPhotos,
                category
            );

            return result;
        } catch (err) {
            setError(prevError => ({ ...prevError, adding: err }));
            throw err;
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, adding: false }));
        }
    };


    const updateAssetDetails = async (assetId, mainPhoto, secondaryPhotos, description) => {
        setLoading(prevLoading => ({ ...prevLoading, updating: true }));
        setError(prevError => ({ ...prevError, updating: null }));
        try {
            const tx = await updateAsset(signer, assetId, mainPhoto, secondaryPhotos, description);


            const updatedAsset = await getAssetById(assetId);

            const updateAssetInList = (assets, setAssets) => {
                const index = assets.findIndex(a => a.assetId === assetId);
                if (index !== -1) {
                    const newAssets = [...assets];
                    newAssets[index] = updatedAsset;
                    setAssets(newAssets);
                } else {
                    setAssets(prevAssets => [...prevAssets, updatedAsset]);
                }
            };
            switch (updatedAsset.status) {
                case ProjectStatus.Started:
                    updateAssetInList(startedAssets, setStartedAssets);
                    break;
                case ProjectStatus.Funded:
                    updateAssetInList(fundedAssets, setFundedAssets);
                    break;
                case ProjectStatus.Failed:
                    updateAssetInList(failedAssets, setFailedAssets);
                    break;
                case ProjectStatus.Completed:
                    updateAssetInList(completedAssets, setCompletedAssets);
                    break;
                default:
                    break;
            }

            return tx;
        } catch (err) {
            setError(prevError => ({ ...prevError, updating: err }));
            throw err;
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, updating: false }));
        }
    };

    const fetchAssetById = useCallback(async (assetId) => {
        setLoading(prevLoading => ({ ...prevLoading, fetchingAsset: true }));
        setError(prevError => ({ ...prevError, fetchingAsset: null }));
        try {
            const assetData = await getAssetById(assetId);
            setAsset(assetData);
        } catch (err) {
            setError(prevError => ({ ...prevError, fetchingAsset: err }));
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, fetchingAsset: false }));
        }
    }, []);

    const fetchAssetsOfOwner = useCallback(async (ownerAddress) => {
        setLoading(prevLoading => ({ ...prevLoading, fetchingOwnerAssets: true }));
        setError(prevError => ({ ...prevError, fetchingOwnerAssets: null }));
        try {
            const ownerAssetsData = await getAssetsOfOwner(ownerAddress);
            setOwnerAssets(ownerAssetsData);
        } catch (err) {
            setError(prevError => ({ ...prevError, fetchingOwnerAssets: err }));
        } finally {
            setLoading(prevLoading => ({ ...prevLoading, fetchingOwnerAssets: false }));
        }
    }, []);

    useEffect(() => {
        if (address) {
            fetchAssetsOfOwner(address);
        }
    }, [address, fetchAssetsOfOwner]);

    return {
        startedAssets, startedInvestmentAmounts, startedInvestorCounts, loadingStarted: loading.started, errorStarted: error.started,
        fundedAssets, fundedInvestmentAmounts, fundedInvestorCounts, loadingFunded: loading.funded, errorFunded: error.funded,
        failedAssets, failedInvestmentAmounts, failedInvestorCounts, loadingFailed: loading.failed, errorFailed: error.failed,
        completedAssets, completedInvestmentAmounts, completedInvestorCounts, loadingCompleted: loading.completed, errorCompleted: error.completed,
        ownerAssets, loadingOwnerAssets: loading.fetchingOwnerAssets, errorOwnerAssets: error.fetchingOwnerAssets,
        createAsset, loadingAdding: loading.adding, errorAdding: error.adding,
        updateAssetDetails, loadingUpdating: loading.updating, errorUpdating: error.updating,
        fetchAssetById, asset, loadingFetchingAsset: loading.fetchingAsset, errorFetchingAsset: error.fetchingAsset,
        fetchAssetsOfOwner
    };
}

// src/hooks/Nftventure/useAssets.js
export const getNFTById = async (id) => {
    try {
        const response = await fetch(`https://api.tuendpoint.com/nft/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching NFT:', error);
        return null;
    }
};
