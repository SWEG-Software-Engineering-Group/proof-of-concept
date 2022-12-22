import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function TenantUsersList({tenantId} : {tenantId : string}) {

  const [users, setUsers] = useState<string[]>(['a','b','c']);


  const userList= users.map(user=>
    <ListItem key={user} id={user} secondaryAction={<IconButton edge='end' aria-label='delete' onClick={() => deleteUser(user)}><DeleteIcon /></IconButton>}>
      <ListItemText
          primary={`UserId = ${user}`}
          //secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>
  ) 

  const deleteUser = (userId : string) =>{
    const newList = users.filter((user) => user !== userId);

    setUsers(newList);
  }

    return(
      <>
      {(users.length !== 0) ? 
        <Card>
          <List>
            {userList}
          </List>
        </Card>        
        
        :
        
        <Card>
            <Typography variant='h2'>There's no users in this tenant</Typography>
        </Card>
      }
      
        <Link to='/admin/tenantSettings/users/createUser'>
            <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                <AddCircleOutlineIcon fontSize='large'/>
            </ IconButton>
        </Link>
      </>
    ) 
}


              