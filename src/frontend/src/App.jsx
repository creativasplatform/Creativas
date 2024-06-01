import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import Navbar from "./landing/Navbar.jsx";
import Body from "./landing/Body";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar/>
        <Body/>
      </UserProvider>
    </div>
  );
}

export default App;
