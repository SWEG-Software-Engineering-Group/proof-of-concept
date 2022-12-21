import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { TranslationFSView } from "../pages/TranslationFSView";
import App from "./App";
import TranslationCard from "../components/TranslationCard";
import TranslationView from "../pages/TranslationView";
import SuperAdminView from "../pages/SuperAdminView";
import CreateTenantView from "../pages/CreateTenantView"
import AdminView from "../pages/AdminView";
export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>;
                <Route path="/todo/" element={<TranslationFSView/>}/>;
                <Route path="/todo/:folderId" element={<TranslationFSView/>}/>;
                <Route path="/todo/write/:translationId" element={<TranslationView/>}/>;
                <Route path="/todo/edit/:translationId" element={<TranslationView/>}/>;

                <Route path="/superAdmin/" element={<SuperAdminView/>}/>;
                <Route path="/superAdmin/createTenant" element={<CreateTenantView/>}/>;

                <Route path="/admin/" element={<AdminView/>}/>;
            </Routes>
        </BrowserRouter>
    )
}