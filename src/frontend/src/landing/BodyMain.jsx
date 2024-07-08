import React, { useState, useEffect } from 'react';
import NavbarLanding from './Navbar.jsx';
import Body from './Body.jsx';
import { useNavigate } from 'react-router-dom';

const BodyMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    navigate('/nfts'); // Redirigir a la ruta deseada
  };

  return (
    <div>
      <NavbarLanding isMobile={isMobile} />
      <Body showButton={isMobile} handleButtonClick={handleButtonClick} />
    </div>
  );
};

export default BodyMain;
