import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hamburguesaicon from "../assets/hamburguesa.png";
import cerraricon from "../assets/cruz.png";
import CreativasLogo from '../assets/CreativasLogo2.png';
import docsIcon from '../assets/docs.png';
import communityIcon from '../assets/comunidad.png';
import faqIcon from '../assets/FAQ.png';
import aboutIcon from '../assets/about.png';

const NavbarLanding = ({ isMobile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/nfts'); 
  };

  const toggleSidebar = () => {
    setSidebarOpen(true);
  };

  const toggleSidebarClose = () => {
    setSidebarOpen(false);
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-customblack to-primary pt-8 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-8">
          <a className="flex items-center space-x-3 rtl:space-x-reverse -mt-2.5 lg:ml-14 xs:ml-4 md:ml-32 ml-8">
            <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
          </a>
          {isMobile ? (
            <div className="flex items-center">
              <img 
                src={hamburguesaicon} 
                className="h-8 mr-8 cursor-pointer" 
                alt={"Menu Icon"} 
                onClick={toggleSidebar} 
              />
            </div>
          ) : (
            <div className="block w-full md:block md:w-auto" id="navbar-default">
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
                  className="text-secondary -mt-2.5 bg-primary hover:bg-primary-ligth focus:outline-none font-medium rounded-full text-sm lg:text-lg px-5 py-2.5 text-center ml-4 dark:bg-white dark:text-secondary dark:hover:bg-gray-200"
                >
                  Get Started
                </button>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {isMobile && sidebarOpen && (
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-50 w-full h-full transition-transform -translate-x-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} aria-label="Sidebar`}>  
          <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-r from-primary to-primary">
            <a className="flex items-center ps-2.5 mb-5">
              <img src={CreativasLogo} className="h-6 me-3 sm:h-7 ml-6" alt="Flowbite Logo" />
            </a>
            <div className="flex items-center">
              <img 
                src={cerraricon} 
                className="h-4 w-4 mr-8 -mt-8 cursor-pointer" 
                alt={"Close Icon"} 
                onClick={toggleSidebarClose} 
              />
            </div>
            <ul className="space-y-2 font-medium">
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={docsIcon} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="Community Icon" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Docs</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={communityIcon} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="Community Icon" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Community</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={faqIcon} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="FAQ Icon" />
                  <span className="flex-1 ms-3 whitespace-nowrap">FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <img src={aboutIcon} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" alt="About Us Icon" />
                  <span className="flex-1 ms-3 whitespace-nowrap">About Us</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default NavbarLanding;
