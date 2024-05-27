import React, { useState } from "react";
import { UserProvider } from './context/userContext.jsx';
import AuthComponent from "./components/login.jsx";

function App() {
  return (
    <div className="App">
    <UserProvider>
  <AuthComponent />
  </UserProvider>
</div>
  );
}

export default App;
