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