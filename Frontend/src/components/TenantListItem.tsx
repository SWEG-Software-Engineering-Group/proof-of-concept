import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

export default function TenantListItem(props:any) {
/*
    const [tenantName, setTenantName] = useState<string>('');
*/
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          "name": props.tenantName,
        }) 
      };


    const deleteTenant = () => {
    fetch('http://localhost:3000/dev/deleteTenant' , requestOptions )
    .then(res => res.text()) 
    .then(res => console.log(res));

    window.location.reload();               // RICARICA LA PAGINA
    }

    // logica
//    "name":"tenantname"




    return(
        <ListItem
            sx={{bgcolor: props.bgcolor}}
            divider
            secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTenant()}>
                <DeleteIcon 
                />                                
            </IconButton>
            }
        >
            {/* <ListItemAvatar>
            <Avatar>
                <FolderIcon />
            </Avatar>
            </ListItemAvatar> */}
            <ListItemText
            primary= {props.tenantName}
            secondary={true ? 'Admin name' : null}
            />
        </ListItem>
    )
}