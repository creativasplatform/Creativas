import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { BrowserRouter as Router } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
    <Router>
      <App />
    </Router>
    </NextUIProvider>
  </React.StrictMode>
);
