import React, { useState } from 'react';
import CreativasLogo from '../assets/CreativasLogo2.png';
import { SearchIcon } from "./SearchIcon.jsx";
import { Input } from "@nextui-org/react";

const Navbar = ({ onOpenModal }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <nav className="bg-customblack pt-8 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center space-x-20 rtl:space-x-reverse mt-4"> {/* Ajusta las clases aquí */}
          <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
          <button
            type="button"
            className="text-white bg-secondary hover:bg-secondary-ligth focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleOpenLoginModal}
          >
            Explorer
          </button>
        </a>

        {/* Barra de búsqueda centrada */}
        <div className="flex-grow flex items-center justify-center mr-64 mt-4">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10 rounded-md bg-white",
              mainWrapper: "h-full",
              input: "text-small outline-none",
              inputWrapper: "h-full font-normal text-default-500 bg-customblack dark:bg-customblack border border-white",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>

        <div className="hidden w-full md:block md:w-auto mt-4" id="navbar-default">
          <ul className="font-medium flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="mb-2 md:mb-0">
              <button
                type="button"
                className="text-customblack bg-green hover:bg-green-ligth focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center md:text-left dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleOpenLoginModal}
              >
                Log in
              </button>
            </li>
          </ul>
        </div>
      </div>

      {openLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full">
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bienvenido
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="p-6 space-y-6">
                <p className="text-center text-lg font-medium">Inicia sesión</p>
                <div className="space-y-4">
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <span role="img" aria-label="Email">📧</span> Email
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <span role="img" aria-label="Crypto Wallet">🔐</span> Billeteras cripto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
