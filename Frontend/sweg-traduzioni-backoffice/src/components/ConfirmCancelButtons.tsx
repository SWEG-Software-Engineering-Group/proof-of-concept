import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function ConfirmCancelButtons(props: any) {
//hooks

//logics
const navigate = useNavigate();
//ui
    return(
        <Grid container sx={{padding:'0 .5rem', justifyContent:'space-between'}}>
            <Grid item>
                {/* <Link to={props.to}><Button color='error' variant='outlined'>Cancel</Button></Link> */}
                <Button color='error' variant='outlined' onClick={() => navigate(-1)}>Cancel</Button>
            </Grid>

            <Grid item>
               <Button type='submit' onClick={() => props.handleConfirm()} variant='contained'>Confirm</Button>
             </Grid>
  
        </Grid>
    )
}