// src/NFTFunding/BodyMarketplace.jsx
import React, { useState, useEffect, useRef } from 'react';
import NavbarMarketplace from './NavbarMarketplace';
import StepProgress from './StepProgress';
import Categories from './Categories';
import categoriaone from "../assets/categories/categoria1.png"
import categoriatwo from "../assets/categories/categoria2.png"
import categoriathree from "../assets/categories/categoria3.png"
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import writeicon from "../assets/write.png"
import "../index.scss"
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUser from '../hooks/user/useuser.jsx';
import circulo from "../assets/circulo.png"
import masicon from "../assets/mas.png"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import usePinata from '../hooks/pinata/usepinata.jsx';
import { Spinner } from '@nextui-org/react';
import { useSpring, useTransition, animated } from '@react-spring/web';
import walleticon from "../assets/wallet.png";
import googleicon from "../assets/google.png";
import useAssets from '../hooks/Nftventure/useAssets';
import useRewards from '../hooks/Nftventure/useRewards';
import errorpicture from "../assets/error.png"
import aceptarpicture from "../assets/aceptar.png"
import { Category } from '../helpers/AssetsHelpers.js';
import { NFTVenture, rpcURL } from "../utils/constans.js"

const NFTFunding = () => {
    const [openModal, setOpenModal] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { address, isLoggedIn, loginWallet, loginWeb3Auth, authType, Provider } = useUser();
    const [hasRewards, setHasRewards] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [errors, setErrors] = useState({});
    const [cards, setCards] = useState([
        { id: 1, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' },
        { id: 2, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' }
    ]);
    const [fundingObjective, setFundingObjective] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [endDate, setEndDate] = useState(today(getLocalTimeZone()).add({ days: 1 }));
    const [rewards, setRewards] = useState([]);
    const [rewardErrors, setRewardErrors] = useState({});
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [ConfirmationButtons, setConfirmationButtons] = useState(false);
    const categories = [
        { id: 1, name: 'Technology', image: categoriatwo },
        { id: 2, name: 'Gaming', image: categoriaone },
        { id: 3, name: 'Music', image: categoriathree },
        { id: 4, name: 'Movies', image: categoriatwo },
        // { id: 5, name: 'Art', image: categoriatwo },
    ];
    const [images, setImages] = useState([]);
    const inputFileRef = useRef(null);
    const { uploadFile, fetchImage, error, uploadJsonToPinata } = usePinata();
    const [loading, setLoading] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null)
    const { createAsset } = useAssets()
    const { createRewards } = useRewards()
    const [assetId, setAssetId] = useState(null)
    const [loadingAddNFT, setLoadingAddNFT] = useState(false);


    const modalAnimation = useSpring({
        opacity: openModal ? 1 : 0,
        transform: openModal ? 'scale(1)' : 'scale(0.9)',
        config: { duration: 300 },
      });

    const modalLoginAnimation = useSpring({
        opacity: openLoginModal ? 1 : 0,
        transform: openLoginModal ? 'scale(1)' : 'scale(0.9)',
        config: { duration: 300 },
    });

    const handleOpenLoginModal = () => {
        setOpenLoginModal(true);
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    const handleLoginWallet = async () => {
        try {
            setOpenModal(null);
            setOpenLoginModal(false);
            await loginWallet();
        } catch (error) {
            console.error("Error logging in with wallet:", error);
        } finally {
            setOpenModal('verification-modal');
        }

    };

    const handleLoginWeb3Auth = async () => {
        try {
            setOpenModal(null);
            setOpenLoginModal(false);
            await loginWeb3Auth();

        } catch (error) {
            console.error("Error logging in with Web3Auth:", error);
        } finally {
            setOpenModal('verification-modal');
        }
    };



    const addCard = () => {
        const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;
        setCards([...cards, { id: newId, rewardName: '', rewardPrice: '', numberOfRewards: '', rewardDescription: '' }]);
    };

    const removeCard = () => {
        const newCards = cards.slice(0, -1);
        setCards(newCards);
    };

    useEffect(() => {
        if (cards.length === 0) {
            setRewards([]);
            setHasRewards(false);
            setCards([
                { id: 1, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' },
                { id: 2, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' },
            ]);
            onClose();
        }
    }, [cards.length]);

    const handleFundingObjectiveChange = (e) => {
        setFundingObjective(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, fundingObjective: '' }));
    };




    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleCheckboxChange = (value) => {
        if (value) {
            handleCheckModalOpen();
        } else {
            setHasRewards(false);
            setRewards([]);
            setCards([
                { id: 1, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' },
                { id: 2, rewardName: '', rewardPrice: 0, numberOfRewards: 0, rewardDescription: '' }
            ]);
            setUnsavedChanges(false);
        }
    };

    const handleOpenModal = (modalId) => {
        setOpenModal(modalId);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        setCurrentStep(1);
        setSelectedCategory(null);
        setFormData({ title: '', description: '' });
        setFundingObjective('');
        setEndDate(today(getLocalTimeZone()).add({ days: 1 }));
        setImages([])
        setErrors([])
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleCardChange = (id, field, value) => {
        setUnsavedChanges(true);
        setCards((prevCards) =>
            prevCards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
        );

        setRewardErrors((prevErrors) => ({
            ...prevErrors,
            [id]: { ...prevErrors[id], [field]: value ? '' : '' }
        }));
    };

    const validateRewards = () => {
        let valid = true;
        const newErrors = {};

        cards.forEach((card) => {
            const cardErrors = {};

            if (!card.rewardName) {
                cardErrors.rewardName = 'This field is required';
                valid = false;
            }

            if (card.rewardPrice === undefined || card.rewardPrice === null || card.rewardPrice === '') {
                cardErrors.rewardPrice = 'This field is required';
                valid = false;
            } else if (card.rewardPrice <= 0) {
                cardErrors.rewardPrice = 'Price must be greater than 0';
                valid = false;
            }

            if (card.numberOfRewards === undefined || card.numberOfRewards === null || card.numberOfRewards === '') {
                cardErrors.numberOfRewards = 'This field is required';
                valid = false;
            } else if (card.numberOfRewards <= 0) {
                cardErrors.numberOfRewards = 'Number must be greater than 0';
                valid = false;
            }

            if (!card.rewardDescription) {
                cardErrors.rewardDescription = 'This field is required';
                valid = false;
            }

            if (Object.keys(cardErrors).length > 0) {
                newErrors[card.id] = cardErrors;
            }
        });

        setRewardErrors(newErrors);
        return valid;
    };

    const handleSaveRewards = () => {
        if (validateRewards()) {
            setRewards(cards);
            onClose();
            setHasRewards(true);
            setUnsavedChanges(false);
        }
    };

    const handleAcceptChanges = () => {
        handleSaveRewards();
        setConfirmationButtons(false);
    };

    const handleDiscardChanges = () => {
        setCards(rewards);
        setUnsavedChanges(false);
        setConfirmationButtons(false);
    };

    const handleCheckModalClose = () => {
        if (unsavedChanges) {
            setConfirmationButtons(true);
        } else {
            if (cards.length === 0) {
                setHasRewards(false);
            }
            onClose();
        }
    };

    const handleCheckModalOpen = () => {
        onOpen();
    };
    const handleNextStep = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'This field is required';
        if (!formData.description) newErrors.description = 'This field is required';
        if (currentStep === 3 && (fundingObjective === '')) {
            newErrors.fundingObjective = 'This field is required';
        } else if (currentStep === 3 && (fundingObjective <= 0)) {
            newErrors.fundingObjective = 'The funding objetive must be greater than 0';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (currentStep === 3) {
                setOpenModal('verification-modal');
            } else {
                setCurrentStep((prevStep) => prevStep + 1);
            }
        }
    };


    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && images.length < 5) {
            setLoading(true);
            try {
                const hash = await uploadFile(file);
                const url = await fetchImage(hash);
                setImages([...images, { hash, url }]);
                setErrors((prevErrors) => ({ ...prevErrors, projectPictures: '' }));
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setLoading(false);
            }
        }
    };


    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };
    const processRewards = async (cards, mainImage) => {
        const processedRewards = [];
        for (const card of cards) {
            const ipfsHash = await uploadJsonToPinata(card.rewardName, mainImage, card.rewardDescription);
            const tokenURI = `https://green-capable-vole-518.mypinata.cloud/ipfs/${ipfsHash}`;

            processedRewards.push({
                tokenURI,
                title: card.rewardName,
                description: card.rewardDescription,
                tokenAmount: card.numberOfRewards,
                individualPrice: card.rewardPrice
            });
        }
        return processedRewards;
    };

    const handleCreateAsset = async () => {
        if (images.length === 0) {
            setErrors((prevErrors) => ({ ...prevErrors, projectPictures: 'At least one project picture is required.' }));
            return;
        }
        handleCloseModal();

        setOpenModal('loading-modal');
        setLoading(true);
        setLoadingMessage('Creating Project...');

        const endDateUnix = new Date(
            endDate.year,
            endDate.month - 1,
            endDate.day
        ).getTime() / 1000;

        try {
            const mainImage = images[0].url;
            const ipfsHash = await uploadJsonToPinata(formData.title, mainImage, formData.description);
            const tokenURI = `https://green-capable-vole-518.mypinata.cloud/ipfs/${ipfsHash}`;

            const category = categories.find(cat => cat.id === selectedCategory).name;

            const { transactionHash, assetId } = await createAsset(
                fundingObjective,
                address,
                formData.title,
                formData.description,
                endDateUnix,
                address,
                tokenURI,
                mainImage,
                images.slice(1),
                Category[category]
            );

            setAssetId(assetId)

            setLoadingMessage(`Project hash: ${transactionHash}`);
            await new Promise(resolve => setTimeout(resolve, 2000));

            let rewardsMessage = '';
            if (hasRewards) {
                setLoadingMessage('Creating Rewards...');
                const processedRewards = await processRewards(cards, mainImage);
                const rewardsTx = await createRewards(assetId, processedRewards);
                rewardsMessage = ` Rewards created at <br/>${rewardsTx.rewardTokenAddress}`;
                setLoadingMessage(`Rewards hash: ${rewardsTx.transactionHash}`);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoadingMessage(`Project created at <br/>${NFTVenture} with ID: ${assetId}<br/>${rewardsMessage}`);


            setLoading(false);

        } catch (error) {
            console.error("Error creating project or rewards:", error);
            setLoadingMessage('Failed to create project or rewards. Try again.');
            setLoading(false);
        }
    };


    const handleCloseLoadingModal = () => {
        setOpenModal('');
        setLoadingMessage('');
        window.location.reload();
        setAssetId(null)
    };


    const handleAddNFT = async () => {
        setLoadingAddNFT(true);
        try {
           const wasAdded = await Provider.provider 
              .request({
                method: "wallet_watchAsset",
                params: {
                  type: "ERC721", 
                  options: {
                    address: NFTVenture,
                    tokenId: assetId,
                  },
                },
              });
          
            if (wasAdded) {
                setOpenModal('');
                setLoadingMessage('');
                window.location.reload();
                setAssetId(null)
                setLoadingAddNFT(false);
            } else {
              console.error("User did not add the token.")
              setLoadingAddNFT(false);
            }
          } catch (error) {

            console.error(error);
            setLoadingAddNFT(false);
          }

          
    }


    const renderModalContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="flex-grow flex items-center justify-center ml-12 mt-4 ">
                            <Input color='default' variant='bordered'
                                classNames={{
                                    base: 'max-w-full sm:max-w-[20rem] h-10 rounded-lg ',
                                    mainWrapper: 'h-full',
                                    input: 'text-small outline-none ',
                                    inputWrapper: 'h-full font-thin text-white bg-[#202129] dark:bg-[#202129] border border-white dark:border-[#34343F]  rounded-lg ',
                                }}
                                placeholder="   Enter project category..."
                                size="sm"
                                startContent={<SearchIcon size={18} />}
                                type="search"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`relative mb-2 rounded-lg shadow cursor-pointer ${selectedCategory === category.id ? 'border-2 border-secondary' : ''
                                        }`}
                                    onClick={() => handleCategorySelect(category.id)}
                                    style={{ background: 'linear-gradient(to bottom, black 50%, white 50%)' }}
                                >
                                    <img
                                        className="rounded-lg w-full h-[200px] object-cover rounded-t-lg"
                                        src={category.image}
                                        alt={category.name}
                                    />

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900  text-center">{category.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={!selectedCategory}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <form className="space-y-4 max-w-lg ml-40">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] mt-4 ml-1">
                                    Project Title
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        placeholder="Creativas"
                                        onChange={handleInputChange}
                                        className={`mb-8 mt-2 w-[600px] bg-[#202129] dark:bg-[#202129] text-white mt-1 block p-2 border ${errors.title ? 'border-red-500' : 'border-[#34343F]'} dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                    {errors.title && <p className="text-[#E16060] text-xs -mt-4">{errors.title}</p>}
                                    <img src={writeicon} alt="Write Icon" className={`absolute right-2  ${errors.title ? 'top-1/4' : 'top-1/2'} transform -translate-y-1/2 w-5 h-5`} />
                                </div>
                                <div className="relative">
                                    <label htmlFor="description" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] mt-4 mb-2">
                                        Project Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder="Project to improve our finances...."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className={`mb-8  text-white w-[600px] bg-[#202129] dark:bg-[#202129] mt-1 block p-2 border ${errors.description ? 'border-red-500' : 'border-[#34343F]'} dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        rows="8"
                                    />
                                    {errors.description && <p className="text-[#E16060] text-xs -mt-4">{errors.description}</p>}
                                    <img src={writeicon} alt="Write Icon" className="absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5" />
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end mt-4">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                            <button
                                onClick={handlePreviousStep}
                                className="mr-4 text-white bg-[#444553] dark:bg-[#444553] hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:focus:ring-blue-800"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Next
                            </button>

                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 className="text-xl font-semibold text-[#D5D6E1] ml-14">
                            Project specification
                        </h3>
                        <form className="space-y-4 max-w-lg -ml-16">
                            <div>
                                <label htmlFor="fundingObjective" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] -mt-2 ml-1 mb-1">
                                    Funding objective
                                </label>
                                <Input
                                    color='default'
                                    variant='faded'
                                    placeholder='0'
                                    classNames={{
                                        base: "max-w-full sm:max-w-[20rem] h-10  bg-[#34343F] mb-4 rounded-lg",
                                        mainWrapper: "h-full",
                                        input: "text-small outline-none ",
                                        inputWrapper: "h-full font-thin text-white bg-[#202129] dark:bg-[#202129] border border-[#34343F] rounded-lg ",
                                    }}
                                    labelPlacement="outside"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="ml-1 text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    endContent={
                                        <div className="flex items-center">
                                            <label className="sr-only" htmlFor="currency">Currency</label>
                                            <select
                                                className="outline-none border-0 bg-transparent text-white text-small"
                                                id="currency"
                                                name="currency"
                                                value={currency}
                                                onChange={handleCurrencyChange}
                                            >
                                                <option>USD</option>
                                                <option>ARS</option>
                                                <option>EUR</option>
                                            </select>
                                        </div>
                                    }
                                    type="number"
                                    value={fundingObjective}
                                    onChange={handleFundingObjectiveChange}
                                />

                                {errors.fundingObjective && <p className="text-[#E16060] text-xs mb-2 -mt-4">{errors.fundingObjective}</p>}

                                <div className='relative'>

                                </div>

                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] -mt-2 ml-1">
                                    With reward?
                                </label>

                                <div className="inline-flex items-center -ml-2 mb-4">
                                    <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="checkYes">
                                        <input
                                            type="checkbox"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                            id="checkYes"
                                            checked={hasRewards}
                                            onChange={() => handleCheckboxChange(true)}
                                        />
                                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label className="mt-px text-sm inline-block text-[#D5D6E1] dark:text-[#D5D6E1]" htmlFor="checkYes">
                                        Yes
                                    </label>

                                    {hasRewards && (
                                        <button
                                            type="button"
                                            onClick={handleCheckModalOpen}
                                            className="ml-2 mt-0.5 text-secondary text-xs"
                                        >
                                            Edit rewards
                                        </button>
                                    )}
                                </div>

                                <div className="inline-flex items-center mb-4">
                                    <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="checkNo">
                                        <input
                                            type="checkbox"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                            id="checkNo"
                                            checked={!hasRewards}
                                            onChange={() => handleCheckboxChange(false)}
                                        />
                                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label className="mt-px text-sm inline-block text-[#D5D6E1] dark:text-[#D5D6E1]" htmlFor="checkNo">
                                        No
                                    </label>

                                </div>

                                <Modal
                                    size='xl'
                                    backdrop="opaque"
                                    isOpen={isOpen}
                                    onClose={handleCheckModalClose}

                                    motionProps={{
                                        variants: {
                                            enter: {
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                },
                                            },
                                            exit: {
                                                y: -20,
                                                opacity: 0,
                                                transition: {
                                                    duration: 0.2,
                                                    ease: "easeIn",
                                                },
                                            },
                                        }
                                    }}
                                    classNames={{
                                        body: "py-6",
                                        backdrop: "bg-customblack/50 backdrop-opacity-40",
                                        base: "border-gray-600 bg-[#31323E] dark:bg-[#31323E] text-white",
                                        header: "border-b-[1px] border-gray-500",
                                        footer: "border-t-[1px] border-gray-500",
                                        closeButton: "hover:bg-white/5 active:bg-white/10",
                                    }}
                                >
                                    <ModalContent>
                                        {() => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Tell us about your rewards</ModalHeader>
                                                {ConfirmationButtons && (
                                                    <div className="relative">
                                                        <div className="absolute -top-6 right-0 mt-4 mr-6 z-50 flex justify-end gap-2  bg-gray-900 p-4 rounded-lg shadow-lg">
                                                            <Button className='bg-white' color="secondary" variant="faded" onPress={handleDiscardChanges}>
                                                                Discard changes
                                                            </Button>
                                                            <Button color="secondary" onClick={handleAcceptChanges}>
                                                                Save changes
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}

                                                <ModalBody>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {cards.map((card) => (
                                                            <div key={card.id} className="card bg-gray-800 p-4 rounded-lg w-full max-w-sm">
                                                                <div className="flex justify-between items-center mb-4">
                                                                    <div>Reward #{card.id}</div>
                                                                    <button
                                                                        type="button"
                                                                        className="text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        onClick={removeCard}
                                                                    >
                                                                        <svg
                                                                            className="w-3 h-3"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 14 14"
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                            />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor={`name-${card.id}`} className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] mt-4 ml-1">
                                                                        Reward name
                                                                    </label>
                                                                    <div className="relative mb-4">
                                                                        <input
                                                                            id={`rewardName-${card.id}`}
                                                                            type="text"
                                                                            value={card.rewardName}
                                                                            onChange={(e) => handleCardChange(card.id, 'rewardName', e.target.value)}
                                                                            placeholder="Reward Name"
                                                                            error={rewardErrors[card.id]?.rewardName}
                                                                            className={`w-full bg-[#202129] dark:bg-[#202129] text-white mt-1 block p-2 border border-[#34343F] dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                                                        />
                                                                        {rewardErrors[card.id]?.rewardName && <span className="text-[#E16060] text-sm">{rewardErrors[card.id]?.rewardName}</span>}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="price" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1]">Reward Price</label>
                                                                    <Input color='default' variant='faded'
                                                                        classNames={{
                                                                            base: "max-w-full h-10  bg-[#34343F] rounded-lg",
                                                                            mainWrapper: "h-full",
                                                                            input: "text-small outline-none ",
                                                                            inputWrapper: "h-full font-thin text-white bg-[#202129] dark:bg-[#202129] border border-[#34343F] rounded-lg ",
                                                                        }}
                                                                        labelPlacement="outside"
                                                                        startContent={
                                                                            <div className="pointer-events-none flex items-center">
                                                                                <span className="ml-1 text-default-400 text-small">$</span>
                                                                            </div>
                                                                        }
                                                                        endContent={
                                                                            <div className="flex items-center">
                                                                                <label className="sr-only" htmlFor="currency">
                                                                                    Currency
                                                                                </label>
                                                                                <select
                                                                                    className="outline-none border-0 bg-transparent text-white text-small"
                                                                                    id="currency"
                                                                                    name="currency"
                                                                                >
                                                                                    <option>USD</option>
                                                                                    <option>ARS</option>
                                                                                    <option>EUR</option>
                                                                                </select>
                                                                            </div>
                                                                        }
                                                                        id={`rewardPrice-${card.id}`}
                                                                        value={card.rewardPrice}
                                                                        onChange={(e) => handleCardChange(card.id, 'rewardPrice', e.target.value)}
                                                                        type="number"
                                                                        error={rewardErrors[card.id]?.rewardPrice}
                                                                    />
                                                                    {rewardErrors[card.id]?.rewardPrice && <span className="text-[#E16060] text-sm">{rewardErrors[card.id]?.rewardPrice}</span>}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="amount" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1]">Number of Rewards:</label>
                                                                    <Input color='default' variant='faded'
                                                                        classNames={{
                                                                            base: "max-w-full h-10  bg-[#34343F] rounded-lg",
                                                                            mainWrapper: "h-full",
                                                                            input: "text-small outline-none ",
                                                                            inputWrapper: "h-full font-thin text-white bg-[#202129] dark:bg-[#202129] border border-[#34343F] rounded-lg ",
                                                                        }}
                                                                        labelPlacement="outside"
                                                                        type="number"
                                                                        id={`numberOfRewards-${card.id}`}
                                                                        value={card.numberOfRewards}
                                                                        onChange={(e) => handleCardChange(card.id, 'numberOfRewards', e.target.value)}
                                                                        error={rewardErrors[card.id]?.numberOfRewards}
                                                                    />
                                                                    {rewardErrors[card.id]?.numberOfRewards && <span className="text-[#E16060]  text-sm">{rewardErrors[card.id]?.numberOfRewards}</span>}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="description" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] mt-4 mb-2">
                                                                        Reward Description
                                                                    </label>
                                                                    <textarea
                                                                        name="description"
                                                                        id={`rewardDescription-${card.id}`}
                                                                        type="text"
                                                                        value={card.rewardDescription}
                                                                        onChange={(e) => handleCardChange(card.id, 'rewardDescription', e.target.value)}
                                                                        placeholder="Get some tickets to our concert...."
                                                                        className="text-white w-full bg-[#202129] dark:bg-[#202129] mt-1 block p-2 border border-[#34343F] dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                                        rows="4"
                                                                        error={rewardErrors[card.id]?.rewardDescription}
                                                                    />
                                                                    {rewardErrors[card.id]?.rewardDescription && <span className="text-[#E16060] text-sm">{rewardErrors[card.id]?.rewardDescription}</span>}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className='bg-white' color="secondary" variant="faded" onPress={addCard}>
                                                        Add reward
                                                    </Button>
                                                    <Button color="secondary" onClick={handleSaveRewards}>
                                                        Save rewards
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>

                                </Modal>

                                <div className='relative mb-24'>
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="endDate" className="block text-sm font-medium text-[#D5D6E1] dark:text-[#D5D6E1] -mt-3 ml-1">
                                            Final day of project financing
                                        </label>
                                        <DatePicker color='default' className='bg-[#202129]  rounded-xl' size='sm'
                                            label="Campaign end date"
                                            aria-label="Campaign end date"
                                            variant="bordered"
                                            showMonthAndYearPickers
                                            minValue={today(getLocalTimeZone()).add({ days: 1 })}
                                            defaultValue={today(getLocalTimeZone()).add({ days: 1 })}
                                            value={endDate}
                                            onChange={handleEndDateChange}



                                        />
                                    </div>

                                </div>


                            </div>

                        </form>

                        <div className="flex justify-end">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="mr-4 text-white bg-[#444553] dark:bg-[#444553] hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:focus:ring-blue-800">
                                Previous
                            </button>
                            <button
                                onClick={handleNextStep}
                                className="text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth  focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:focus:ring-blue-800"
                            >    Next
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderVerificationModalContent = () => (
        <>
            <div className="space-y-4 mb-24">
                <div className="relative ml-28">
                    <label htmlFor="autor" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 ml-1">
                        Project author
                    </label>
                    <input
                        type="text"
                        name="autor"
                        id="autor"
                        disabled={true}
                        placeholder={address ? address : "0x0000000000000000000000000000000000000000"}
                        className="mb-16 -mt-4 w-[600px] bg-[#202129] dark:bg-[#202129] text-white mt-1 block p-2 border border-[#34343F] dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-between items-start mt-4">
                    <div className="flex flex-col items-center">
                        {images.length > 0 && (
                            <>
                                <label className="block text-sm font-medium text-secondary dark:text-secondary ml-28">Profile Picture</label>
                                <div className="w-[200px] h-[193px] mt-0">
                                    <img src={images[0].url} className="w-full h-full object-cover rounded-xl ml-14" alt="Profile" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col items-center">
                        {images.length > 1 && (
                            <>
                                <label className="block text-sm font-medium text-secondary dark:text-secondary -mr-[860px]">Project Pictures</label>
                                <div className="grid grid-cols-2 gap-4 -mr-[870px]">
                                    {images.slice(1, 5).map((image, index) => (
                                        <div key={index} className="w-[100px] h-[100px]">
                                            <img src={image.url} className="w-full h-full object-cover rounded-xl" alt={`Project Image ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <button
                        className="relative mb-2 mr-[320px] w-[200px] h-[193px] flex items-center justify-center bg-[#202129] rounded-xl border-2 border-dashed border-gray-500 text-white"
                        onClick={handleButtonClick}
                        disabled={images.length >= 5}
                    >
                        <div className="flex flex-col items-center">
                            {loading ? (
                                <Spinner label="Loading..." color="warning" labelColor="warning" />
                            ) : (
                                <>
                                    <img src={circulo} className="absolute h-12 w-12 mb-8 z-10" style={{ top: '30%', transform: 'translateY(-50%)' }} alt="Circulo Icon" />
                                    <img src={masicon} className="absolute h-4 w-4 mb-8 z-20" style={{ top: '30%', transform: 'translateY(-50%)' }} alt="Add Icon" />
                                    <span className='text-sm text-gray-400 text-center mt-24 z-30'>
                                        {images.length === 0 ? 'Click to choose your Project Profile Picture' : images.length < 5 ? 'Now choose your Project Pictures' : 'Maximum images reached'}
                                    </span>

                                    {errors.projectPictures && <p className="text-[#E16060] text-xs">{errors.projectPictures}</p>}


                                </>
                            )}
                        </div>
                    </button>
                </div>
                <input
                    type="file"
                    ref={inputFileRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="flex justify-end mt-4">
                <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                <button
                    onClick={() => setOpenModal('extralarge-modal')}
                    className="mr-4 text-white bg-[#444553] dark:bg-[#444553] hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:focus:ring-blue-800"
                    disabled={loading}
                >
                    Edit
                </button>
                <button
                    disabled={loading}
                    onClick={isLoggedIn && address ? handleCreateAsset : handleOpenLoginModal}

                    className={`text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left ${isLoggedIn && address ? 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : ''

                        }`}

                >
                    {isLoggedIn && address ? 'Complete' : 'Connect'}
                </button>
            </div>
        </>
    );

    return (
        <>

            <Categories onOpenModal={() => handleOpenModal('extralarge-modal')} />
            {openModal === 'extralarge-modal' && (
             <animated.div style={modalAnimation}
                    id="extralarge-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full"
                >
                 
                    <div className="relative w-full max-w-4xl max-h-[100vh] min-w-[40vw]">
                        <div className="relative bg-black rounded-lg shadow dark:bg-gray-800 h-full" >
                            <div className="flex flex-col h-full">
                                <div className="p-4 bg-[#31323E] dark:bg-[#31323E] rounded-t-lg flex justify-between items-center ">
                                    <h3 className="text-xl font-semibold text-white">
                                        Create Project
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleCloseModal}
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <StepProgress currentStep={currentStep} />
                                <div className="p-6 space-y-6 bg-gray-800 rounded-b-lg flex-grow">


                                    {renderModalContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                    </animated.div>
           
            )}

            {openModal === 'verification-modal' && (
                <div
                    id="verification-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full "
                >
                    <div className="relative w-full max-w-4xl max-h-[100vh] min-w-[40vw]">
                        <div className="relative rounded-lg shadow dark:bg-gray-800 h-full">
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-[#31323E]  bg-[#31323E] dark:bg-[#31323E]">
                                <h3 className="text-xl font-semibold text-white dark:text-white">
                                    Choose project images
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6 h-full flex-grow">
                                {renderVerificationModalContent()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {openModal === 'loading-modal' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
                    <div className="relative bg-gray-800 shadow-md dark:bg-gray-800 rounded-xl">
                        <div className="p-6 space-y-6 bg-gray-800 rounded-xl">
                            {loading ? (
                                <Spinner size='lg' label={loadingMessage} color={loadingMessage.includes('Successfully') ? 'success' : 'warning'} labelColor='foreground' />
                            ) : (
                                <>
                                    {loadingMessage.includes('Failed') ? (
                                        <>
                                            <img src={errorpicture} alt="Error" className="mx-auto w-8 h-8" />
                                            <p className="text-center text-xl text-white font-roboto">{loadingMessage}</p>
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg"
                                                    onClick={handleCloseLoadingModal}
                                                >
                                                    Back to Home
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        loadingMessage.includes('Project created') && (
                                            <>
                                                <img src={aceptarpicture} alt="Success" className="mx-auto w-8 h-8 mb-12" />
                                                <p className="text-center text-xl text-white font-roboto" dangerouslySetInnerHTML={{ __html: loadingMessage }}></p>
                                                <div className="flex justify-end mt-4 space-x-4">
                                                    {authType === 'wallet' && Provider.provider.isMetaMask && (
                                                             <button
                                                             className="mt-4 bg-white text-secondary font-roboto text-lg px-4 py-2 rounded-lg flex items-center justify-center w-28"
                                                             onClick={handleAddNFT}
                                                             disabled={loadingAddNFT} // Deshabilitar el botón mientras está cargando
                                                           >
                                                             {loadingAddNFT ? (
                                                               <Spinner
                                                                 size='md'
                                                            
                                                                 color='success'
                                                                 labelColor='foreground'
                                                               />
                                                             ) : (
                                                               "Add NFT"
                                                             )}
                                                           </button>
                                                    )}

                                                    <button
                                                        className="mt-4 bg-secondary text-white px-4 font-roboto text-lg py-2 rounded-lg"
                                                        onClick={handleCloseLoadingModal}
                                                    >
                                                        Back to Home
                                                    </button>

                                                </div>
                                            </>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}



            {openLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
                    <animated.div style={modalLoginAnimation} className="relative w-full max-w-md">
                        <div className="relative bg-gray-800 shadow-md dark:bg-[#19191E] rounded-xl">
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-700 ">
                                <p className="text-lg text-white font-thin">Welcome again</p>
                                <button
                                    type="button"
                                    className="text-white bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleCloseLoginModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6 bg-[#19191E] rounded-xl">
                                <p className="text-center text-lg text-white font-thin">Log in</p>
                                <div className="space-y-4">
                                    <button
                                        className="w-full px-4 py-2 text-sm font-thin text-black bg-gray-800 rounded-lg hover:bg-gray-700 dark:[#19191E] dark:text-white dark:hover:bg-gray-700"
                                        onClick={handleLoginWallet}
                                    >
                                        <img src={walleticon} className="inline-block w-4 h-4 mr-2" alt="Wallet Icon" />
                                        Wallet
                                    </button>

                                    <div className="flex items-center justify-center space-x-4 mt-2">
                                        <div className="w-2/4 h-[0.5px] bg-white"></div>
                                        <span className="text-white text-sm">Or</span>
                                        <div className="w-2/4 h-[0.5px] bg-white"></div>
                                    </div>

                                    <button
                                        className="w-full px-4 py-2 text-sm font-thin text-black bg-gray-800 rounded-lg hover:bg-gray-700 dark:[#19191E] dark:text-white dark:hover:bg-gray-700"
                                        onClick={handleLoginWeb3Auth}
                                    >
                                        <img src={googleicon} className="inline-block w-4 h-4 mr-2" alt="Google Icon" />
                                        Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div>

            )}


        </>

    );
};

export default NFTFunding;
