import React from 'react';

const StepProgress = ({ currentStep }) => {
    return (
        <div className="bg-[#31323E] p-4">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                {/* Step 1 */}
                <li className={`flex md:w-full items-center ${currentStep >= 1 ? 'text-secondary dark:text-secondary' : ''} sm:after:content-[''] after:w-full after:h-1 ${currentStep >= 2 ? 'after:border-secondary after:dark:border-secondary' : 'after:border-gray-500 after:dark:border-gray-700'} after:border-b-2 after:border-dashed after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {currentStep >= 1 && (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        )}
                        Select <span className="hidden sm:inline-flex sm:ms-2">Category</span>
                    </span>
                </li>

                {/* Step 2 */}
                <li className={`flex md:w-full items-center ${currentStep >= 2 ? 'text-secondary dark:text-secondary' : ''} sm:after:content-[''] after:w-full after:h-1 ${currentStep >= 3 ? 'after:border-secondary after:dark:border-secondary' : 'after:border-gray-500 after:dark:border-gray-700'} after:border-b-2 after:border-dashed after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {currentStep >= 2 && (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        )}
                         <span className="hidden sm:inline-flex sm:ms-2">Branding</span>
                    </span>
                </li>

                {/* Step 3 */}
                <li className={`flex items-center ${currentStep >= 3 ? 'text-secondary dark:text-secondary' : ''}`}>
                    {currentStep >= 3 && (
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                    )}
                   General
                </li>
            </ol>
        </div>
    );
};

export default StepProgress;
