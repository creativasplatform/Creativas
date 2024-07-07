import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import CreativasLogo from '../assets/CreativasLogo2.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/nfts'); // Redirigir a la ruta deseada
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-customblack to-primary pt-8 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-8">
        <a className="flex items-center space-x-3 rtl:space-x-reverse -mt-2.5 lg:ml-14 xs:ml-24 ml-8">
          <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
        </a>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-white h-6 w-6 cursor-pointer mr-8" />
          ) : (
            <FaBars className="text-white h-6 w-6 cursor-pointer mr-8" />
          )}
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">Docs</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">Community</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white">FAQ</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-lg text-[#9398A7] rounded md:bg-transparent hover:text-white" aria-current="page">About us</a>
            </li>
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-secondary -mt-2.5 bg-primary hover:bg-primary-ligth focus:outline-none  font-medium rounded-full text-sm lg:text-lg  px-5 py-2.5 text-center me-2 mb-2 dark:bg-white dark:text-secondary dark:hover:bg-gray-200"
            >
              Get Started
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
