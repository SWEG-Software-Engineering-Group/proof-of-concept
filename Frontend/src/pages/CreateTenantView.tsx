import React, {useState} from 'react';
import Tenant from '../interfaces/Tenant';
import { IconButton, Button, Grid, Box, TextField, Typography } from '@mui/material';
import TenantList from '../components/TenantList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link, useNavigate} from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons';
import LanguagePicker from '../components/LanguagePicker';
import ConfirmButtons from '../components/ConfirmButton';
import Confermaindietro from '../components/ConfermaIndietro';

export default function CreateTenantView() {
    const startingLanguage = 'English';
    const [tenantName, setTenantName] = useState<string>('');
    const [defaultLanguage, setDefaultLanguage] = useState<string>(startingLanguage);
    const [adminUsername, setAdminUsername] = useState<string>('');
    const [adminSuffix, setAdminSuffix] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

//  LOGICA

    const handleSubmit = (e:any) =>{
        e.preventDefault();

/*        console.log(
            {
                tenantName,
                defaultLanguage,
                admin: adminUsername + adminSuffix,
                password,
                confirmPassword,
            });
*/ 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
            "name": tenantName,
            "mainlang":defaultLanguage,
            "languages":[defaultLanguage],
            "users":["pippo", "bruno", "fabrizio"]
            }) 
        };
        fetch('http://localhost:3000/dev/createTenant', requestOptions)
            .then(response => response.json())
            .then(data => {});

            /*
        "username": "username1",
            "password": "password",
            "type": "admin",
            "email": "email"*/ 

            const requestOptionsNewUser = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                "username": adminUsername,
                "password": password,
                "type": "admin",
                "email":"email"
                }) 
      };

        fetch('http://localhost:3000/dev/createUser', requestOptionsNewUser)
            .then(response => response.json())
            .then(data => {});
    }
        
    const handleLanguageChange = (e : any) => {
        console.log(e.target.value);
        setDefaultLanguage(e.target.value);
    }

    return (
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',}}
        >
            <Grid container columnSpacing= {5} minHeight={'100vh'}>
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem', marginBottom:'1rem'}}  onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <form
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit} 
                        >
                        <div>
                            <Typography variant={'h5'} margin={'0 0 1rem .5rem'}>Choose tenant name</Typography>
                            <TextField
                            required
                            id="tenantName"
                            label="Tenant name"
                            fullWidth
                            onChange={(e) => {
                                    setTenantName(e.target.value);
                                    setAdminSuffix(e.target.value)
                                }
                            }
                            />
                        </div>
                        <div>
                            <Typography variant={'h5'} margin={'2rem 0 1rem .5rem'}>Choose default language</Typography>
                            <LanguagePicker 
                            handleLanguageChange={handleLanguageChange}
                            default={startingLanguage}
                            />
                             { /*                            
                             */ }
                        </div>
                
                        <div>
                            <Typography variant={'h5'} margin={'2rem 0 1rem .5rem'}>Choose admin credentials</Typography>
                            <Grid container columnSpacing={2} sx={{marginBottom:'1rem'}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="adminUsername"
                                    label="Admin username"
                                    onChange={(e) => {setAdminUsername(e.target.value)}}
                                    fullWidth                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    id="adminSuffix"
                                    label="Admin suffix - read only"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={adminSuffix}
                                    fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(e) => {setPassword(e.target.value)}}
                            sx={{marginBottom:'1rem'}}
                            />
                            <TextField
                            id="confirmPassword"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            sx={{marginBottom:'1rem'}}
                            />
                        </div>  
                            <Grid item>  <ConfirmCancelButtons to='/superAdmin' handleConfirm={()=>{}}/> </Grid>
                    </form>
                </Grid>
            </Grid>
            <Grid container wrap="nowrap" sx={{                
                    flexDirection:'column',
                    gap:'2rem',
                    translate: '' 
                }}>
            </Grid>

        </div>
    )
}