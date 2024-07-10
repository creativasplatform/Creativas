// src/App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import BodyMain from "./landing/BodyMain.jsx"
import Card from "./landing/Card.jsx";
import NFTFunding from "./NFTFunding/NFTFunding.jsx";
import { UserProvider } from './context/userContext';
import { DfinityProvider } from "./context/IdentityContext.jsx";
import Footer from "./landing/Footer.jsx";
import NFTSteps from "./landing/NFTSteps.jsx";
import Carousel from "./landing/BrowseCategory.jsx";
import NotableDrops from "./landing/NotableDrops.jsx";
import HeroSection from "./landing/HeroSection.jsx";
import PromoBanner from "./landing/PromoBanner.jsx";
import Numbers from "./landing/Numbers.jsx";
import Patherns from "./landing/Pathners.jsx";
import NFTs from "./landing/NFTs..jsx";
import Contact from "./landing/Contact.jsx";
import Video from "./landing/Video.jsx";
function App() {
  return (
    <div className="App">

      <UserProvider>
        <DfinityProvider>
          <Routes>
            <Route path="/" element={
              <>
                <BodyMain />
                <HeroSection/>
                <PromoBanner/>
                <Numbers/>
      <div className="absolute top-4/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-256 blur-40 opacity-100 w-64 h-64 rounded-lg"></div>

                <NFTSteps />
                <Video/>
                <Patherns />
                <Card />




                <Carousel />
                <NFTs />
                <Contact />
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