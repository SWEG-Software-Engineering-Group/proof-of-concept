import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
 
export default function ConfirmButtons(props: any) {
//hooks

//logics

//ui
    return(
        <Grid container sx={{padding:'0 .5rem', justifyContent:'space-between'}}>
            <Grid item>
                <Button type='submit' variant='contained'>conferma</Button>
            </Grid>
        </Grid>
    )
}