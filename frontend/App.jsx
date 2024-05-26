import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import UserComponent from "./components/login.jsx";
const App = () => {

  

  return (
    <div className="App">
        <UserProvider>
      <UserComponent />
      </UserProvider>
    </div>

  );
};

export default App;
