import React, { useState } from "react";
import { Card, Grid, Button, Typography, IconButton, TextField} from '@mui/material';
import ApproveDiscardButtons from "../ApproveDiscardButtons";

export default function NewTextModal(props:any) {

    const [text, setText] = useState<string>('');


    const handleDiscard = () =>{
        //resetta testo nell'input field
        setText('')
        props.closeModal();
    }
    const handleAccept = () =>{
        //chiamate api per creare la cartella / categoria
        props.closeModal();//chiude il modal
    }

    return(
        <Grid container wrap="nowrap" sx={{
                flexDirection:'column',
                gap:'2rem',
                translate: '',
                width: '95%',
                margin: 'auto',
            }}>
            <Grid item xs={12}>
                <Typography variant={'h4'} component={'h2'}>Enter a new text to be translated</Typography>            
                <TextField required multiline rows={'5'} fullWidth onChange={(e)=> setText(e.target.value)} value={text}>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Enter additional comments</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setText(e.target.value)} value={text}>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Enter a list of links separated by commas</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setText(e.target.value)} value={text}>
                </TextField>
            </Grid>
            <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/>
        </Grid>
    )
}

//la categoria di appartenza del testo viene ricavata dalla cartella in cui viene aggiunto, altrimenti appartiene all' 'index'