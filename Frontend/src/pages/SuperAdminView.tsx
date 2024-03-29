import React, {useEffect, useState} from 'react';
import Tenant from '../interfaces/Tenant';
import { IconButton, Button, Grid } from '@mui/material';
import TenantList from '../components/TenantList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link, useNavigate} from 'react-router-dom';

export default  function SuperAdminView()  {
    //const [tenants, setTenants] = useState<Tenant[]>();

    const response = (async () => (await (await fetch('http://localhost:3000/dev/allTenants')).json()).then(console.log("ciao")));

    const [tenants, setTenants] = useState<Tenant[]>();
    const navigate = useNavigate();

 
    useEffect(() => {
     if ( localStorage.getItem('tipo-di-utente') == "admin" ) {
         navigate("/admin");
     }
     if ( localStorage.getItem('tipo-di-utente') == "user" ) {
         navigate("/todo");
     }
   }, []);

   // this.setState({ totalReactPackages: data.total }); 

    return (
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',}}
        >
            <Grid container columnSpacing= {5} rowSpacing={5} minHeight={'100vh'}>
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}} onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TenantList />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Link to='/superAdmin/createTenant'>
                        <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                            <AddCircleOutlineIcon fontSize='large'/>
                        </ IconButton>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}