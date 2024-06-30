import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreativasLogo from '../assets/CreativasLogo2.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/nfts'); // Redirigir a la ruta deseada
  };

  return (
    <nav className="bg-gradient-to-r from-customblack to-primary pt-8 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-8">
        <a className="flex items-center space-x-3 rtl:space-x-reverse -mt-2.5">
          <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
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
              className="text-secondary -mt-2.5 bg-primary hover:bg-primary-ligth focus:outline-none  font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2 dark:bg-white dark:text-secondary dark:hover:bg-gray-200"
            >
              Get Started
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
