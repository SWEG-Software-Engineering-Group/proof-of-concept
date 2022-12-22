import React from "react"
import {CardActions, IconButton} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

export default function TranslationCardAdminActions({folderId} : {folderId:string}) {
    //hooks

    //logics
    function handleClick() {
        console.log('ciao');
    }

    //ui
    return(
        <CardActions sx={{marginLeft:'auto', padding:'0 .75rem .75rem'}}>
        <Link to={`../admin/folderSettings/${folderId}`} style={{marginLeft:'auto', padding:0}}>
            <IconButton onClick={handleClick} aria-label="open admin settings">
                <SettingsIcon/>
            </IconButton>
        </Link>
    </CardActions>
    )
}