// src/App.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext.jsx';
import AuthComponent from "./components/login.jsx";
import Items from "./components/Items.jsx";
import PinataExample from "./components/Pinata.jsx"
import Body from "./landing/Body.jsx";
import Navbar from "./landing/Navbar.jsx";
import Card from "./landing/Card.jsx";
import NavbarMarketplace from "./NFTFunding/NavbarMarketplace.jsx";
import BodyMarketplace from "./NFTFunding/BodyMarketplace.jsx";
import Categories from "./NFTFunding/Categories.jsx";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
