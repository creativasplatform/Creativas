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
import Contact from "./landing/Contact.jsx";
import BodyMain from "./landing/BodyMain.jsx"
import Video from "./landing/Video.jsx";
// import NFTDetail from "./NFTFunding/NFTDetail.jsx"; // Importa el nuevo componente
import NotFound from "./landing/NotFound.jsx"; // Importa el componente 404
import NFTDetail from "./NFTFunding/NFTDetails/Details.jsx";
import CardDetails from "./NFTFunding/NFTDetails/CardDetails.jsx";

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
                <NotableDrops/>
                <Navbar />
                <Body />
                <HeroSection />
                <PromoBanner />
                <Numbers />
                <div className="absolute top-4/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rgba-104-207-256 blur-40 opacity-100 w-64 h-64 rounded-lg"></div>
                <NotableDrops />
                <NFTSteps />
                <Video />
                <Pathners />
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
            <Route path="/nft/:id" element={
              <>
                <Navbar />
                <NFTDetail />
                <CardDetails/>
                <Footer />
              </>
            } />
            {/* <Route path="/Nfts/:id" element={<NFTDetail />} /> Nueva ruta con parámetro */}
            <Route path="*" element={<NotFound />} /> {/* Ruta catch-all para manejar 404 */}
          </Routes>
        </DfinityProvider>
      </UserProvider>
    </div>
  );
}

export default App;
