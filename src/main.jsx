import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './utils/NProgressConfig.js';
import App from './App.jsx';
import {ThemeProvider} from "@material-tailwind/react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);