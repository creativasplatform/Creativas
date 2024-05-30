import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import AuthComponent from "./components/login.jsx";
import Items from "./components/Items.jsx";
function App() {
  return (
    <div className="App">
    <UserProvider>
    <Items />
  {/* <AuthComponent /> */}

  </UserProvider>
</div>
  );
}

export default App;
