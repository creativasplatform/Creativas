import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';

const App = () => {

  

  return (
    <div className="App">
        <UserProvider>
      <p>holaa</p>
      </UserProvider>
    </div>

  );
};

export default App;
