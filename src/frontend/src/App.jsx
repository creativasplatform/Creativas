import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import AuthComponent from "./components/login.jsx";
import Items from "./components/Items.jsx";
import PinataExample from "./components/Pinata.jsx"
import Body from "./landing/Body.jsx";
import Navbar from "./landing/Navbar.jsx";
function App() {
  return (
    <div className="App">
      <DfinityProvider>
    <UserProvider>
    <Navbar/>
    <Body/>
    {/* <Items /> */}
  <AuthComponent /> 
  </UserProvider>
  </DfinityProvider>
</div>
  );
}

export default App;
