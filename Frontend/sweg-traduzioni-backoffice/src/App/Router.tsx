import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { TranslationFSView } from "../pages/TranslationFSView";
import App from "./App";
import TranslationCard from "../components/TranslationCard";
import TranslationView from "../pages/TranslationView";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TranslationCard />}/>;
                <Route path="/todo/" element={<TranslationFSView/>}/>;
                <Route path="/todo/:folderId" element={<TranslationFSView/>}/>;
                <Route path="/todo/write/:translationId" element={<TranslationView/>}/>;
                <Route path="/todo/edit/:translationId" element={<TranslationView/>}/>;
            </Routes>
        </BrowserRouter>
    )
}