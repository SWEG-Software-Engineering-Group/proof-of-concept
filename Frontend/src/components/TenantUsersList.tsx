import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { deleteData, getData } from '../functions/globals/axiosFunction';

export default function TenantUsersList({tenantId} : {tenantId : string}) {

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    console.log('loading users');
      getData(`http://localhost:3000/dev/${tenantId}/users`).then((res : any) => {
          console.log(res.data.users);
          setUsers(res.data.users);
      })
      .catch((err : any) =>{
          console.error(err);
      })
  }, [])

  const deleteUser = (username : string) =>{
    deleteData(`http://localhost:3000/dev/${username}/delete`).then((res : any) => {
          console.log("delete",res);          
      })
      .catch((err : any) =>{
          console.error(err);
    })
    const newList = users.filter((user : any) => {
      return user !== username;
    });    
    setUsers(newList);    
  }
  
  const userList= users.map((user : any) =>
    <ListItem key={user} id={user} secondaryAction={<IconButton edge='end' aria-label='delete' onClick={() => deleteUser(user)}><DeleteIcon /></IconButton>}>
      <ListItemText
          primary={`User = ${user}`}
          //secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>
  ) 


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
            <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to user creation page">
                <AddCircleOutlineIcon fontSize='large'/>
            </ IconButton>
        </Link>
      </>
    ) 
}


              