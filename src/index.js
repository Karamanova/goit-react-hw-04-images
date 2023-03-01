import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import './toastify.css';
// import 'react-toastify/dist/ReactToastify.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
