import React, {useState} from 'react';
import Tenant from '../interfaces/Tenant';
import { IconButton, Button, Grid } from '@mui/material';
import TenantList from '../components/TenantList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from 'react-router-dom';

export default function SuperAdminView() {
    const [tenants, setTenants] = useState<Tenant[]>();
    return (
        <>
            <Grid container columnSpacing= {5} minHeight={'100vh'}padding={'1.5em'}>
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TenantList />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Link to='/superAdmin/createTenant'>
                        <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                            <AddCircleOutlineIcon fontSize='large'/>
                        </ IconButton>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}