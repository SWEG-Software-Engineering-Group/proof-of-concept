import React from "react"
import {CardActions, IconButton, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export default function TranslationCardAdminActions({translationId}: {translationId : string}) {
    //hooks

    //logics


    //ui
    return(
    localStorage.getItem('tipo-di-utente') == "admin" ?    
    <CardActions sx={{marginLeft:'auto', padding:'0 .75rem .75rem'}}>
        <Typography sx={{marginLeft:'auto', marginRight:'.5rem', color:'text.disabled'}}>Edit original text</Typography>
        <Link to={`/todo/edit/${translationId}`}>
            <IconButton sx={{padding: 0}} aria-label="go to text editor for original text">
                <EditIcon/>
            </IconButton>
        </Link>
    </CardActions>
    :
    <></>
    )
}