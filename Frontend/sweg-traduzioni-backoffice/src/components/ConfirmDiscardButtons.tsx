import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ConfirmDiscardButtons(props: any) {
//hooks

//logics

//ui
    return(
        <Grid container sx={{margin:'auto', justifyContent:'space-between'}}>
            <Grid item>
                <Link to={props.to}><Button color='error' variant='outlined'>Discard</Button></Link>
            </Grid>
            <Grid item>
                <Button variant='contained'>Confirm</Button>
            </Grid>
        </Grid>
    )
}