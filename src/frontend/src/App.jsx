import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import AuthComponent from "./components/login.jsx";
import { DfinityProvider } from './context/IdentityContext.jsx';
import PinataExamplems from "./components/Pinata.jsx";

function App() {
  return (
    <div className="App">
      <DfinityProvider>
    <UserProvider>
    {/* <Items /> */}
  <AuthComponent /> 
  </UserProvider>
  </DfinityProvider>
</div>
  );
}

export default App;
