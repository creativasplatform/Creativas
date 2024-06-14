import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreativasLogo from '../assets/CreativasLogo2.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/marketplace'); // Ruta a la que deseas redirigir
  };

  return (
    <nav className="bg-[#0b0c0c] pt-8 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={CreativasLogo} className="h-8" alt="Creativas Logo" />
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="#" className="block px-2 text-white rounded md:bg-transparent" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block px-2 text-white rounded md:bg-transparent">Docs</a>
            </li>
            <button type="button" onClick={handleButtonClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
          </ul>
        </div>
      </div>
      {/* Línea horizontal blanca */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-white "></div>
    </nav>
  );
}

export default Navbar;
