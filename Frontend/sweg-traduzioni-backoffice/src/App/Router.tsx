import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { TranslationFSView } from "../pages/TranslationFSView";
import App from "./App";
import TranslationCard from "../components/TranslationCard";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/todoView" element={<TranslationFSView />}/>;
                <Route path="/" element={<TranslationCard />}/>;
            </Routes>
        </BrowserRouter>
    )
}