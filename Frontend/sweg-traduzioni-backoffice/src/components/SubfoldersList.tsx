import React from 'react';
import { List, Link, ListItem, ListItemButton, ListItemText, Card } from '@mui/material';

export default function SubfoldersList({folderId} : {folderId : string}) {
    return(
        <Card>
          <List>
            <ListItem divider disablePadding>
              <ListItemButton component="a" href="/todo/f1">
                <ListItemText primary="Folder with id = 1" />
              </ListItemButton>
            </ListItem>
            <ListItem divider disablePadding>
              <ListItemButton component="a" href="/todo/f123">
                <ListItemText primary="Folder with id = 123" />
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
    )
}