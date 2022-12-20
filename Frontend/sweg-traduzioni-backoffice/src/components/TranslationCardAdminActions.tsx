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
    <CardActions>
        <IconButton onClick={handleClick} sx={{marginLeft:'auto'}} aria-label="open admin settings">
            <SettingsIcon/>
        </IconButton>
    </CardActions>
    )
}