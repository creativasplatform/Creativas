import React from 'react';
import logo from "./assets/logo2.svg"
import { eccomerce } from '../src/declarations/eccomerce';
function App() {


  return (
    <main>
      <img src={logo} alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" >
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
    </main>
  );
}

export default App;
