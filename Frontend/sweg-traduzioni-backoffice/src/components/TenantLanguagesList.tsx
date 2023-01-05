import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function TenantLanguagesList({tenantId, tenantLanguages} : {tenantId : string, tenantLanguages : string[]}) {

  const [languages, setLanguages] = useState<string[]>(tenantLanguages);


  const languageList= languages.map(language=>
    <ListItem key={language} id={language} secondaryAction={<IconButton edge='end' aria-label='delete' onClick={() => deleteLanguage(language)}><DeleteIcon /></IconButton>}>
      <ListItemText
          primary={`${language}`}
          //secondary={secondary ? 'Secondary text' : null}
      />
    </ListItem>
  ) 

  const deleteLanguage = (languageId : string) =>{
    const newList = languages.filter((language) => language !== languageId);

    setLanguages(newList);
  }

    return(
      <>
      {(languages.length !== 0) ? 
        <Card>
          <List>
            {languageList}
          </List>
        </Card>        
        
        :
        
        <Card>
            <Typography variant='h2'>There's no languages in this tenant</Typography>
        </Card>
      }
      
        {/* <Link to='/admin/tenantSettings/languages/createlanguage'>
            <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                <AddCircleOutlineIcon fontSize='large'/>
            </ IconButton>
        </Link> */}
      </>
    ) 
}


              