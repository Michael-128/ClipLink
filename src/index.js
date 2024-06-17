import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Import your global styles
import App from './app/App'; // Import your main App component

// Use ReactDOM.createRoot() for Concurrent Mode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
