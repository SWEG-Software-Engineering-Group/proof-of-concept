import React, { useState } from "react";
import ConfirmCancelButtons from "../components/ConfirmCancelButtons";
import { Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CreateTenantUserView() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const tenantName = 'tenantNameExample';

    const navigate = useNavigate();
    const saveUser = (e:any)=>{
        e.preventDefault();
        //chiamata API per salvare user sul DB
        console.log('user inserito nel db!')
        if(username.length!=0 && password.length!=0 && confirmPassword.length!=0)
            navigate(-1);
    }

    return(
        <form style={{
            width:'75vw',
            margin:'2rem auto',}}
            noValidate
            autoCapitalize="off"
            onSubmit={(e) => saveUser(e)}
        >
            <Grid container rowSpacing={2} columnSpacing={2} sx={{marginBottom:'2rem'}}
            >
                <Grid item xs={12}>
                    <Typography variant={'h4'}>Enter data to create a new user for this tenant</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth required label={'Username'} onChange={(e:any)=> setUsername(e.target.value)} value={username}>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth required value={tenantName} disabled>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required label={'Password'} onChange={(e:any)=> setPassword(e.target.value)} value={password}>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required label={'Confirm password'} onChange={(e:any)=> setConfirmPassword(e.target.value)} value={confirmPassword}>
                    </TextField>
                </Grid>
            </Grid>
                <ConfirmCancelButtons to={'/admin/tenantSettings/users'}/>
        </form>
    )
}