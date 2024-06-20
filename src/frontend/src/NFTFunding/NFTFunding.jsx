// src/NFTFunding/BodyMarketplace.jsx
import React, { useState } from 'react';
import NavbarMarketplace from './NavbarMarketplace';
import StepProgress from './StepProgress';
import Categories from './Categories';
import categoriaone from "../assets/categories/categoria1.png"
import categoriatwo from "../assets/categories/categoria2.png"
import categoriathree from "../assets/categories/categoria3.png"
import { Image } from '@nextui-org/react';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";
import writeicon from "../assets/write.png"
import agendaicon from "../assets/agenda.png"


const NFTFunding = () => {
    const [openModal, setOpenModal] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: "Technology", image: categoriatwo },
        { id: 2, name: "Gaming", image: categoriatwo },
        { id: 3, name: "Music", image: categoriathree },
        { id: 4, name: "Movies", image: categoriatwo },



    ];

    const handleOpenModal = (modalId) => {
        setOpenModal(modalId);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        setCurrentStep(1);
        setSelectedCategory(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleCalendar = (e) => {
        e.preventDefault();
       
    }

    const handlebutton = () => {
        console.log("Funciona")
    }
    const renderModalContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="flex-grow flex items-center justify-center ml-12 mt-4 ">
                            <Input
                                classNames={{
                                    base: "max-w-full sm:max-w-[20rem] h-10  bg-[#202129]  rounded-lg ",
                                    mainWrapper: "h-full",
                                    input: "text-small outline-none ",
                                    inputWrapper: "h-full font-thin text-white bg-[#202129] dark:bg-[#19191E] border border-[#34343F] rounded-lg ",
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
                                    className={`relative rounded-lg shadow cursor-pointer ${selectedCategory === category.id ? 'border-2 border-secondary' : ''}`}
                                    onClick={() => handleCategorySelect(category.id)}
                                    style={{ background: 'linear-gradient(to bottom, black 50%, white 50%)' }}
                                >

                                    <img
                                        className="rounded-lg w-full h-[200px] object-cover rounded-t-lg"
                                        src={category.image}
                                        alt={category.name}
                                    />

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">{category.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>


                            <button
                                onClick={() => setCurrentStep(2)}
                                className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={!selectedCategory} // Desactiva el botón si no hay categoría seleccionada
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

                                <div className='relative'>
                                    <input

                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        placeholder='Creativas'
                                        onChange={handleInputChange}

                                        className="mb-8 mt-2 w-[600px] text-white bg-[#202129] mt-1 block p-2 border border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700"

                                    />
                                    <img src={writeicon} alt="Write Icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                                </div>
                                <div className='relative'>
                                    <label htmlFor="description" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 mt-4 mb-2">
                                        Project Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        placeholder='Project to improve our finances....'
                                        value={formData.description}
                                        onChange={handleInputChange}

                                        className="mb-6 text-white w-[600px] bg-[#202129] mt-1 block p-2 border border-[#34343F] rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700"
                                        rows="8"
                                    />
                                    <img src={writeicon} alt="Write Icon" className="absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5" />
                                </div>
                            </div>

                        </form>


                        <div className="flex justify-end mt-4">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>

                            <button
                                onClick={() => setCurrentStep(1)}
                                className="mr-4 text-white bg-[#444553] hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                        <form onSubmit={handleCalendar} className="space-y-4 max-w-lg -ml-20">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 -mt-2 ml-1 mb-1">
                                    Funding objective
                                </label>
                                <Input
                                    classNames={{
                                        base: "max-w-full sm:max-w-[20rem] h-10  bg-[#34343F] mb-4 rounded-lg",
                                        mainWrapper: "h-full",
                                        input: "text-small outline-none ",
                                        inputWrapper: "h-full font-thin text-white bg-[#202129] dark:bg-[#19191E] border border-[#34343F] rounded-lg ",
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

                                <div class="inline-flex items-center -ml-2 mb-4">
                                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                                        <input type="checkbox"
                                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                            id="check" />
                                        <span
                                            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                                stroke="currentColor" stroke-width="1">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label class="mt-px font-medium text-sm text-[#D5D6E1] cursor-pointer select-none -ml-2" htmlFor="check">
                                        Yes
                                    </label>
                                </div>

                                <div class="inline-flex items-center">
                                    <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="check">
                                        <input type="checkbox"
                                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#64677C] bg-[#202129] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                            id="check" />
                                        <span
                                            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                                stroke="currentColor" stroke-width="1">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </label>
                                    <label class="mt-px font-medium text-sm text-[#D5D6E1] cursor-pointer select-none -ml-2" htmlFor="check">
                                        No
                                    </label>
                                </div>
                                <label htmlFor="title" className="block text-sm font-medium text-[#D5D6E1] dark:text-gray-300 -mt-3 ml-1">
                                    Final day of project financing
                                </label>
                                <div className='relative -mt-4 mb-8'>
                                    <button
                                        onClick={handlebutton}
                                        className="w-64 -mt-2 flex items-center justify-between -mt-3 mb-12 font-monserrat text-white bg-[#202129] hover:bg-[#4B4B54] border border-[#34343F] focus:outline-none font-thin rounded-lg text-sm px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <span className='text-gray-400'>Choose a date</span>
                                      
                                    </button>
                                    <img src={agendaicon} alt="Write Icon" className="w-5 h-5 ml-56 -mt-20" />
                                        
                                </div>

                            </div>

                        </form>



                        <div className="flex justify-end">
                            <div className="absolute top-50 mt-2 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.5px] bg-gray-700 "></div>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="mr-4 text-white bg-[#444553] hover:bg-gray-600 focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                Previous
                            </button>
                            <button
                                onClick={() => setOpenModal('verification-modal')}
                                className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-thin rounded-lg text-lg px-5 mt-6 py-1.5 h-10 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Next
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
            <div className="space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Please verify the details of your project.
                </p>
                <div>
                    <p><strong>Project Title:</strong> {formData.title}</p>
                    <p><strong>Project Description:</strong> {formData.description}</p>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setOpenModal('extralarge-modal')}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Edit
                </button>
                <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-green-500 text-white rounded"
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
                                <div className="p-4 bg-[#31323E] rounded-t-lg flex justify-between items-center ">
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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full"
                >
                    <div className="relative w-full max-w-2xl min-h-[60vh]"> {/* Establecer altura mínima */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 h-full">
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Verify and Complete
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
