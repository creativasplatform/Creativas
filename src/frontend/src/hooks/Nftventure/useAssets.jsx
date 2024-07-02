import { useState, useEffect, useCallback } from 'react';
import { getAssets, getAssetById, getAssetsOfOwner, addAsset, updateAsset } from '../../views/Nftventure/Assets.js';
import { ProjectStatus } from '../../helpers/AssetsHelpers.js';
import { useUserContext } from '../../context/userContext.jsx';

export default function useAssets() {
    const [startedAssets, setStartedAssets] = useState([]);
    const [fundedAssets, setFundedAssets] = useState([]);
    const [failedAssets, setFailedAssets] = useState([]);
    const [completedAssets, setCompletedAssets] = useState([]);
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
        const fetchAssets = async (status, setAssets, loadingKey, errorKey) => {
            setLoading(prevLoading => ({ ...prevLoading, [loadingKey]: true }));
            setError(prevError => ({ ...prevError, [errorKey]: null }));
            try {
                const data = await getAssets(status);
                setAssets(data);
            } catch (err) {
                setError(prevError => ({ ...prevError, [errorKey]: err }));
            } finally {
                setLoading(prevLoading => ({ ...prevLoading, [loadingKey]: false }));
            }
        };

        fetchAssets(ProjectStatus.Started, setStartedAssets, 'started', 'started');
        fetchAssets(ProjectStatus.Funded, setFundedAssets, 'funded', 'funded');
        fetchAssets(ProjectStatus.Failed, setFailedAssets, 'failed', 'failed');
        fetchAssets(ProjectStatus.Completed, setCompletedAssets, 'completed', 'completed');
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

            // Actualizar startedAssets con el nuevo asset
            const newAsset = {
                assetId: result.assetId,
                price,
                author,
                title,
                description,
                projectEndDate,
                to,
                tokenURI,
                mainPhoto,
                secondaryPhotos,
                category,
                status: ProjectStatus.Started
            };
            setStartedAssets(prevAssets => [...prevAssets, newAsset]);

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
            await tx.wait();

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
        startedAssets, loadingStarted: loading.started, errorStarted: error.started,
        fundedAssets, loadingFunded: loading.funded, errorFunded: error.funded,
        failedAssets, loadingFailed: loading.failed, errorFailed: error.failed,
        completedAssets, loadingCompleted: loading.completed, errorCompleted: error.completed,
        ownerAssets, loadingOwnerAssets: loading.fetchingOwnerAssets, errorOwnerAssets: error.fetchingOwnerAssets,
        createAsset, loadingAdding: loading.adding, errorAdding: error.adding,
        updateAssetDetails, loadingUpdating: loading.updating, errorUpdating: error.updating,
        fetchAssetById, asset, loadingFetchingAsset: loading.fetchingAsset, errorFetchingAsset: error.fetchingAsset,
        fetchAssetsOfOwner
    };
}
