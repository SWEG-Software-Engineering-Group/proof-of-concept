import React from "react"
import {CardActions, IconButton} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

export default function TranslationCardAdminActions() {
    //hooks

    //logics
    function handleClick() {
        console.log('ciao');
    }

    //ui
    return(
        <CardActions sx={{marginLeft:'auto', padding:'0 .75rem .75rem'}}>
        <IconButton onClick={handleClick} sx={{marginLeft:'auto', padding:0}} aria-label="open admin settings">
            <SettingsIcon/>
        </IconButton>
    </CardActions>
    )
}