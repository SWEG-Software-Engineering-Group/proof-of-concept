import React, {useState} from 'react';
import Tenant from '../interfaces/Tenant';
import { IconButton, Button, Grid, Box, TextField, Typography } from '@mui/material';
import TenantList from '../components/TenantList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons';
import LanguagePicker from '../components/LanguagePicker';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SubfoldersList from '../components/SubfoldersList';
import { Container } from '@mui/system';
import TenantUsersList from '../components/TenantUsersList';

export default function FolderSettingsView() {
    const [folderName, setFolderName] = useState<string>('');    
    let {folderId} = useParams<string>();
    if (typeof folderId == 'undefined') folderId = '0';

    const navigate = useNavigate();


    //logics

    const updateName = (folderId ?: string) : void =>{
        // if(!id) update il nome della category con id=0
        //update nome della cartella / categoria visivamente e tramite API
        console.log(folderName);
    }    

    const deleteCategory = (id ?: string) => {
        // if(!id) cancella la category con id=0
        //chimata API per cancellare la categoria e tutto il suo contenuto
        //go to previous page
        //window.location.replace('/todo');

        navigate('/todo');
    }


    return (
        <div style={{
            boxSizing:'border-box',
            width:'85vw',
            padding:'1.5rem',
            margin: '0 auto',
            minHeight:'100vh',
        }}
        >
            <Grid container columnSpacing= {5} rowSpacing={5} >
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem', marginBottom:'1rem'}}  onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div>
                        <Typography variant={'h5'} component={'h2'} margin={'0 0 1rem .5rem'}>Update folder / category name</Typography>
                        <Grid container columnSpacing={2} alignItems={'center'}>
                            <Grid item xs={10}>
                                <TextField
                                required
                                id="categoryName"
                                label="Folder / Category name"
                                fullWidth
                                onChange={(e) => {setFolderName(e.target.value)}}
                                />
                            </Grid>
                            <Grid item  xs={2}>
                                <Button
                                    onClick = {() => updateName(folderId)}
                                    variant='contained'>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Container sx={{marginTop:'2rem'}}>
                        <Typography variant={'h6'} component={'h3'}>Subfolders:</Typography>
                        <SubfoldersList folderId={folderId}/>
                    </Container>            
                </Grid>                
                <IconButton onClick={() => deleteCategory(folderId)} sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                    <DeleteOutlineIcon fontSize='large'/>
                </ IconButton>
            </Grid>

        </div>
    )
}