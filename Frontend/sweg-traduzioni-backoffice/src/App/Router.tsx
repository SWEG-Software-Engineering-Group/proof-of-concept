import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { TranslationFSView } from "../pages/TranslationFSView";
import App from "./App";
import TranslationCard from "../components/TranslationCard";
import TranslationView from "../pages/TranslationView";
import SuperAdminView from "../pages/SuperAdminView";
import CreateTenantView from "../pages/CreateTenantView"
import AdminView from "../pages/AdminView";
import FolderSettingsView from "../pages/FolderSettingsView";
import TenantSettingsView from "../pages/TenantSettingsView";
import TenantUsersView from "../pages/TenantUsersView";
import CreateTenantUserView from "../pages/CreateTenantUserView";
import LoginView from "../pages/LoginView";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginView />}/>;
               
                <Route path="/login" element={<LoginView />}/>;

                <Route path="/todo/" element={<TranslationFSView/>}/>;
                <Route path="/todo/:folderId" element={<TranslationFSView/>}/>;
                <Route path="/todo/write/:translationId" element={<TranslationView/>}/>;
                <Route path="/todo/edit/:translationId" element={<TranslationView/>}/>;

                <Route path="/superAdmin/" element={<SuperAdminView/>}/>;
                <Route path="/superAdmin/createTenant" element={<CreateTenantView/>}/>;

                <Route path="/admin/" element={<AdminView/>}/>;
                <Route path="/admin/folderSettings/:folderId" element={<FolderSettingsView/>}/>;

                <Route path="/admin/tenantSettings/" element={<TenantSettingsView/>}/>;
                <Route path="/admin/tenantSettings/users" element={<TenantUsersView/>}/>;
                <Route path="/admin/tenantSettings/users/createUser" element={<CreateTenantUserView/>}/>;
            </Routes>
        </BrowserRouter>
    )
}