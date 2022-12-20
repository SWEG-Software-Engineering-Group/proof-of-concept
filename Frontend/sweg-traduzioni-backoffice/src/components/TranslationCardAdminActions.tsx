import React from "react"
import {CardActions, IconButton, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function TranslationCardAdminActions() {
    //hooks

    //logics
    function handleClick() {
        console.log('ciao');
    }

    //ui
    return(
    <CardActions sx={{marginLeft:'auto', padding:'0 .75rem .75rem'}}>
        <Typography sx={{marginLeft:'auto', marginRight:'.5rem', color:'text.disabled'}}>Edit original text</Typography>
        <IconButton onClick={handleClick} sx={{padding: 0}} aria-label="go to text editor for original text">
            <EditIcon/>
        </IconButton>
    </CardActions>
    )
}