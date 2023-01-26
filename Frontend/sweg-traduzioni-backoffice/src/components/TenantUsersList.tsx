import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getData } from '../functions/globals/axiosFunction';

export default function TenantUsersList({tenantId} : {tenantId : string}) {

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    console.log('loading users');
      getData('http://localhost:3000/dev/allUsers').then((res : any) => {         //NEED NEW API FOR USER OF SPECIFIC TENANT USING tenantId prop
          console.log(res.data.tenants);
          setUsers(res.data.tenants);
      })
      .catch((err : any) =>{
          console.error(err);
      })
  }, [])

  const userList= users.map((user : any) =>
    <ListItem key={user.username} id={user.username} secondaryAction={<IconButton edge='end' aria-label='delete' onClick={() => deleteUser(user.username)}><DeleteIcon /></IconButton>}>
      <ListItemText
          primary={`UserId = ${user.username}`}
          //secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>
  ) 

  const deleteUser = (username : string) =>{
    const newList = users.filter((user : any) => {
      return user.username !== username;
    });

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


              