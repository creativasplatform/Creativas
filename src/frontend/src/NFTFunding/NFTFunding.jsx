// src/NFTFunding/BodyMarketplace.jsx
import React, { useState } from 'react';
import NavbarMarketplace from './NavbarMarketplace';
import StepProgress from './StepProgress';
import Categories from './Categories';

const NFTFunding = () => {
    const [openModal, setOpenModal] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Gaming" },
        { id: 3, name: "Music" },
        { id: 4, name: "Movies" },
        { id: 5, name: "Art" },
    
    ];

    const handleOpenModal = (modalId) => {
        setOpenModal(modalId);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
        setCurrentStep(1); // Reinicia al primer paso al cerrar el modal
        setSelectedCategory(null); // Reinicia la selección de la categoría al cerrar el modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const renderModalContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`p-4 bg-white rounded-lg shadow dark:bg-gray-800 cursor-pointer ${selectedCategory === category.id ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => handleCategorySelect(category.id)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
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
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Project Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </form>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Contenido del tercer paso.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setOpenModal('verification-modal')}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Verify and Complete
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
            <NavbarMarketplace/>
            <Categories onOpenModal={() => handleOpenModal('extralarge-modal')} />
            {openModal === 'extralarge-modal' && (
                <div 
                    id="extralarge-modal" 
                    tabIndex="-1" 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full"
                >
                    <div className="relative w-full max-w-7xl min-h-[80vh]"> {/* Establecer altura mínima */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 h-full">
                            <div className="flex flex-col h-full">
                                <div className="p-4 bg-[#31323E] rounded-t-lg flex justify-between items-center">
                                    <h3 className="text-xl font-medium text-white">
                                        Create Project
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
                                <StepProgress currentStep={currentStep} />
                                <div className="p-6 space-y-6 bg-[#050B1C] rounded-b-lg flex-grow">
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
