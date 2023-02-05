import React, { useState } from "react";
import { Card, Grid, Button, Typography, IconButton, TextField} from '@mui/material';
import ApproveDiscardButtons from "../ApproveDiscardButtons";

export default function NewFolderModal(props:any) {

    const [folderName, setFolderName] = useState<string>('');


    const handleDiscard = () =>{
        //resetta testo nell'input field
        setFolderName('')
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
                <Typography variant={'h4'}>Enter a name for a new folder / catergory</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth onChange={(e)=> setFolderName(e.target.value)} value={folderName}>
                </TextField>
            </Grid>
            <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/>
        </Grid>
    )
}