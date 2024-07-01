// src/App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./landing/Body.jsx";
import Navbar from "./landing/Navbar.jsx";
import Card from "./landing/Card.jsx";
import NavbarMarketplace from "./NFTFunding/NavbarMarketplace.jsx";
import NFTFunding from "./NFTFunding/NFTFunding.jsx";
import Categories from "./NFTFunding/Categories.jsx";
import { UserProvider } from './context/userContext';
import { DfinityProvider } from "./context/IdentityContext.jsx";
import Footer from "./landing/Footer.jsx";
import NFTSteps from "./landing/NFTSteps.jsx";
import Carousel from "./landing/BrowseCategory.jsx";
import NotableDrops from "./landing/NotableDrops.jsx";
import HeroSection from "./landing/HeroSection.jsx";
import PromoBanner from "./landing/PromoBanner.jsx";
import Numbers from "./landing/Numbers.jsx";

import Pathners from "./landing/Pathners.jsx";
import NFTs from "./landing/NFTs..jsx";
function App() {
  return (
    <div className="App">

      <UserProvider>
        <DfinityProvider>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Body />
                <HeroSection/>
                <PromoBanner/>
                <Numbers/>
      <div className="absolute top-4/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-256 blur-40 opacity-100 w-64 h-64 rounded-lg"></div>


                <Carousel />
                <NotableDrops/>
                <NFTSteps />
                <Pathners />
                <Card />
                <NFTs />
                <Footer />
              </>
            } />
            <Route path="/Nfts" element={
              <>
                <NFTFunding />
                <Footer />

              </>
            } />
          </Routes>
        </DfinityProvider>
      </UserProvider>

    </div>
  );
}

export default App;