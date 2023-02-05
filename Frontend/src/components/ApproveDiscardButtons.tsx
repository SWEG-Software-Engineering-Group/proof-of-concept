import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ApproveDiscardButtons(props: any) {
//hooks

//logics

//ui
    return(
        <Grid container sx={{padding:'0 .5rem', justifyContent:'space-between'}}>
            <Grid item>
                <Button onClick={props.handleDiscard} color='error' variant='outlined'>Discard</Button>
            </Grid>
            <Grid item>
                <Button onClick={props.handleAccept} variant='contained'>Approve</Button>
            </Grid>
        </Grid>
    )
}