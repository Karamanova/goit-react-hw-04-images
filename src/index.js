import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import './toastify.css';
// import 'react-toastify/dist/ReactToastify.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '../node_modules/react-loader-spinner/dist/loader/Rings';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
