import React from 'react';
import List from '@mui/material/List';
import TenantListItem from './TenantListItem';

export default function TenantList(){
    return(
        <List
        sx={{ width: '100%', maxWidth: 360}}
        >
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
            <TenantListItem bgcolor='primary.main'/>
            <TenantListItem bgcolor='secondary.main'/>
        </List>
    )
}