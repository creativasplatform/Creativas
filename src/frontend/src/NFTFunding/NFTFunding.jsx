// src/NFTFunding/BodyMarketplace.jsx
import React, { useState, useEffect } from 'react';
import NavbarMarketplace from './NavbarMarketplace';
import StepProgress from './StepProgress';
import Categories from './Categories';
import categoriaone from "../assets/categories/categoria1.png"
import categoriatwo from "../assets/categories/categoria2.png"
import categoriathree from "../assets/categories/categoria3.png"
import { Calendar, Image } from '@nextui-org/react';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import writeicon from "../assets/write.png"
import agendaicon from "../assets/agenda.png"
import "../index.scss"
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import useUser from '../hooks/user/useuser.jsx';
import circulo from "../assets/circulo.png"
import masicon from "../assets/mas.png"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const NFTFunding = () => {
    const [openModal, setOpenModal] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { address, isLoggedIn } = useUser();
    const [hasRewards, setHasRewards] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [errors, setErrors] = useState({});


    const categories = [
        { id: 1, name: 'Technology', image: categoriatwo },
        { id: 2, name: 'Gaming', image: categoriatwo },
        { id: 3, name: 'Music', image: categoriathree },
        { id: 4, name: 'Movies', image: categoriatwo },
    ];

    const handleCheckboxChange = (value) => {
        setHasRewards(value);
        if (value) {
            onOpen();
        }
    };


    useEffect(() => {
        if (!isOpen) {
            setHasRewards(false);
        }
    }, [isOpen]);
    
    const handleModalClose = () => {
        onClose();
        setHasRewards(false);
    };
    const handleOpenModal = (modalId) => {
        setOpenModal(modalId);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        setCurrentStep(1);
        setSelectedCategory(null);
        setFormData({ title: '', description: '' });
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleNextStep = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'This field is required';
        if (!formData.description) newErrors.description = 'This field is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };


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
                    <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 mt-4 ml-1">
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
                        {errors.title && <p className="text-[#E16060] text-xs mt-1">{errors.title}</p>}
                        <img src={writeicon} alt="Write Icon" className={`absolute right-2  ${errors.title ? 'top-1/4' : 'top-1/2'} transform -translate-y-1/2 w-5 h-5`} />
                    </div>
                    <div className="relative">
                        <label htmlFor="description" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 mt-4 mb-2">
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
                        {errors.description && <p className="text-[#E16060] text-xs mt-1">{errors.description}</p>}
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
                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 -mt-2 ml-1 mb-1">
                                    Funding objective
                                </label>
                                <Input color='default' variant='faded'
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
                                    type="number"
                                />
                                <div className='relative'>

                                </div>
                                <div className='relative'>

                                </div>
                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 -mt-2 ml-1">
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
                <label className="mt-px font-medium text-sm text-[#D5D6E1] cursor-pointer select-none -ml-2" htmlFor="checkYes" onClick={() => handleCheckboxChange(true)}>
                    Yes
                </label>
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
                <label className="mt-px font-medium text-sm text-[#D5D6E1] cursor-pointer select-none -ml-2" htmlFor="checkNo" onClick={() => handleCheckboxChange(false)}>
                    No
                </label>
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
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
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                   Modal Rewards
                                </p>
                                <p>
                                   Modal Rewards
                                </p>
                                <p>
                                   Moda Rewards
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => handleModalClose()}>
                                    Close
                                </Button>
                                <Button color="primary">
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
                                <div className='relative mb-24'>
                                    <div className="w-full flex flex-col gap-1">
                                        <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 -mt-3 ml-1">
                                            Final day of project financing
                                        </label>
                                        <DatePicker color='default' className='bg-[#202129]  rounded-xl' size='sm'
                                            label="Choose a date"
                                            variant="bordered"
                                            showMonthAndYearPickers
                                            minValue={today(getLocalTimeZone()).add({ days: 1 })}
                                            defaultValue={today(getLocalTimeZone()).add({ days: 1 })}

                                            classNames={{
                                                errorMessage: 'text-black'
                                            }}

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
                                onClick={() => setOpenModal('verification-modal')}
                                className="text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth  focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <div className="space-y-4 mb-20">

                <div className="relative ml-28">
                    <label htmlFor="autor" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 ml-1">
                        Project author
                    </label>
                    <input
                        type="text"
                        name="autor"
                        id="autor"
                        disabled={true}
                        placeholder={address}

                        className="mb-24 -mt-4 w-[600px] bg-[#202129] dark:bg-[#202129] text-white mt-1 block p-2 border border-[#34343F] dark:border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                </div>
                <button className="relative mb-2 ml-80 w-[200px] h-[193px] flex items-center justify-center bg-[#202129] rounded-xl border-2 border-dashed border-gray-500 text-white">
                    <div className="flex flex-col items-center">

                        <img src={circulo} className="absolute h-12 w-12 mb-8 z-10" style={{ top: '30%', transform: 'translateY(-50%)' }} alt="Circulo Icon" />


                        <img src={masicon} className="absolute h-4 w-4 mb-8 z-20" style={{ top: '30%', transform: 'translateY(-50%)' }} alt="Add Icon" />

                        <span className='text-sm text-gray-400 text-center mt-12 z-30'>Click to choose your Project Picture</span>
                    </div>
                </button>

            </div>
            <div className="flex justify-end mt-4">
                <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                <button
                    onClick={() => setOpenModal('extralarge-modal')}
                    className="mr-4 text-white bg-[#444553] dark:bg-[#444553] hover:bg-gray-600 dark:hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:focus:ring-blue-800">

                    Edit
                </button>
                <button
                    onClick={handleCloseModal}
                    className="text-white bg-secondary dark:bg-secondary hover:bg-secondary-ligth dark:hover:bg-secondary-ligth  focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Complete
                </button>
            </div>
        </>
    );

    return (
        <>
            <NavbarMarketplace />
            <Categories onOpenModal={() => handleOpenModal('extralarge-modal')} />
            {openModal === 'extralarge-modal' && (
                <div
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
                </div>
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
        </>
    );
};

export default NFTFunding;
