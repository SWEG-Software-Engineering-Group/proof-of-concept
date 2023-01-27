import React, { useState } from "react";
import ConfirmCancelButtons from "../components/ConfirmCancelButtons";
import { Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postData, getData, putData } from "../functions/globals/axiosFunction";

export default function CreateTenantUserView() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const tenantId = 'tenant1';

    const navigate = useNavigate();
    const saveUser = async (e:any)=>{
        e.preventDefault();
        //chiamata API per salvare user sul DB
        const data = {
            username : username.concat('-').concat(tenantId),
            type : 'user',
            password,
            confirmPassword,
        }
        await postData('http://localhost:3000/dev/createUser',data).then((res : any) => {
            console.log(res);
        })
        .catch((err : any) => {
            console.log('error', err);
        })
        console.log('user inserito nel db degli user!');


        let tenantInfo : any;
        await getData(`http://localhost:3000/dev/${tenantId}/info`).then((res : any) =>{
            tenantInfo = res.data.tenant;
            tenantInfo.users = [...tenantInfo.users, username.concat('-').concat(tenantId)]
        })
        .catch((err : any) => {
            console.log(err);
            return;
        });

        await putData(`http://localhost:3000/dev/${tenantId}/update`, tenantInfo).then((res : any) => {
            console.log(res);
        })
        .catch((err : any) => {
            console.log('error', err);
        })
        console.log('user inserito nel db del tenant!');

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
                    <TextField fullWidth required value={tenantId} disabled>
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