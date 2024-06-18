// src/App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./landing/Body.jsx";
import Navbar from "./landing/Navbar.jsx";
import Card from "./landing/Card.jsx";
import NavbarMarketplace from "./NFTFunding/NavbarMarketplace.jsx";
import NFTFunding from "./NFTFunding/NFTFunding.jsx";
import Categories from "./NFTFunding/Categories.jsx";
import Footer from "./landing/Footer.jsx";
import { UserProvider } from './context/userContext';
import { DfinityProvider } from "./context/IdentityContext.jsx";
function App() {
  return (
    <div className="App">
        <UserProvider>
          {/* <DfinityProvider> */}
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Body />
            <Card />
          </>
        } />
        <Route path="/Nfts" element={
          <>
            <NFTFunding/>
       
          </>
        } />
      </Routes>
      <Footer/>
      {/* </DfinityProvider> */}
      </UserProvider>
    </div>
  );
}

export default App;
