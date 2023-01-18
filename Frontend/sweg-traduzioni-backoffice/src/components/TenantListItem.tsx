import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TenantListItem(props:any) {

    return(
        <ListItem
            sx={{bgcolor: props.bgcolor}}
            divider
            secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
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