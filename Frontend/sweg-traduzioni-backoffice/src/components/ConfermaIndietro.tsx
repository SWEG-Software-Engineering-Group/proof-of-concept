import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';
 
export default function ConfermaIndietro(props: any) {
//hooks

//logics

//ui
    return(
        <Grid container sx={{padding:'0 .5rem', justifyContent:'space-between'}}>
            <Grid item>
                <Link to={props.to}><Button  variant='contained'>Ritorna alla vista</Button></Link>
            </Grid>
        </Grid>
    )
}