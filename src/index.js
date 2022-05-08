import React from 'react';
import ReactDom from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './containers/App';
import 'tachyons';

createRoot(document.getElementById('root')).render(<App />);