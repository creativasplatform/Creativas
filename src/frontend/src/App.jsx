// src/App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Body from "./landing/Body.jsx";
import Navbar from "./landing/Navbar.jsx";
import Card from "./landing/Card.jsx";
import NavbarMarketplace from "./NFTFunding/NavbarMarketplace.jsx";
import BodyMarketplace from "./NFTFunding/BodyMarketplace.jsx";
import Categories from "./NFTFunding/Categories.jsx";
import { UserProvider } from './context/userContext';
import { DfinityProvider } from "./context/IdentityContext.jsx";
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
            <Card />
          </>
        } />
        <Route path="/marketplace" element={
          <>
            <BodyMarketplace/>
            <Categories />
          </>
        } />
      </Routes>
      </DfinityProvider>
      </UserProvider>
    </div>
  );
}

export default App;
