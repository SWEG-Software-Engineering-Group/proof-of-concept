import React from 'react';
import {Grid, Button} from '@mui/material';

export default function ConfirmDiscardButtons() {
//hooks

//logics

//ui
    return(
        <Grid container sx={{margin:'auto', justifyContent:'space-between'}}>
            <Grid item>
                <Button color='error' variant='outlined'>Discard</Button>
            </Grid>
            <Grid item>
                <Button variant='contained'>Confirm</Button>
            </Grid>
        </Grid>
    )
}