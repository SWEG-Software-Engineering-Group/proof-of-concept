import React from 'react';
import {Grid, Button} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ConfirmCancelButtons(props: any) {
//hooks

//logics

//ui
    return(
        <Grid container sx={{padding:'0 .5rem', justifyContent:'space-between'}}>
            <Grid item>
                <Link to={props.to}><Button color='error' variant='outlined'>Cancel</Button></Link>
            </Grid>
            {
                 /* A JSX comment
                 
            <Grid item>
               <Button type='submit' variant='contained'>Confirm</Button>
             </Grid>
            
      
            */
    }  
        </Grid>
    )
}