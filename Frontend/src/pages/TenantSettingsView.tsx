import { Button, Card, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LanguagePicker from '../components/LanguagePicker'
import TenantLanguagesList from '../components/TenantLanguagesList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import StarOutlineIcon from '@mui/icons-material/StarOutline'; 
import { putData, getData } from '../functions/globals/axiosFunction'



export default function TenantSettingsView(props: any) {
    const [tenantLanguages, setTenantLanguages] = useState<string[]>([]);
    const [defaultLanguage, setDefaultLanguage] = useState<string>('');
    const [newLanguage, setNewLanguage] = useState<string>('English');   //saves the language selected in the language picker
    const navigate = useNavigate();
    //load tenant's languages
    useEffect(()=>{
        getData(`http://localhost:3000/dev/${tenantId}/allTexts`).then((res : any) =>{
            //console.log(res.data.data);
            let languageObjects : any[] = res.data.data;
            if (languageObjects.length !== 0){
                setDefaultLanguage(languageObjects.find((language : any) => language.original === true).language);
                setTenantLanguages(languageObjects.map((language : any) => language.language ));
            }
        })
        .catch((err : any) => {
            console.log(err);
        });
    },[])


    const languageList= tenantLanguages.map(language=>
      <ListItem key={language} id={language} secondaryAction={<IconButton edge='end' aria-label='delete' onClick={() => deleteLanguage(language)}><DeleteIcon /></IconButton>}>
        <ListItemButton role={undefined} onClick={async () =>  {
                setDefaultLanguage(language);
                let tenantInfo : any;
                await getData(`http://localhost:3000/dev/${tenantId}/info`).then((res : any) =>{
                    tenantInfo = res.data.tenant;
                    tenantInfo.mainlang = language;
                })
                .catch((err : any) => {
                    console.log(err);
                    return;
                });
                await putData(`http://localhost:3000/dev/${tenantId}/update`, tenantInfo).then((res : any) => { //MANCA QUESTA API
                console.log("put",res);          
                })
                .catch((err : any) =>{
                    console.error(err);
                })
                }}>
              <ListItemIcon>
                {language == defaultLanguage ? <StarIcon/> : <StarOutlineIcon/>}                
            </ListItemIcon>
        </ListItemButton>
        <ListItemText
            primary={`${language}`}
            //secondary={secondary ? 'Secondary text' : null}
        />
      </ListItem>
    ) 
  
    const deleteLanguage = async (languageToBeDeleted : string) =>{
        let tenantInfo : any;
        await getData(`http://localhost:3000/dev/${tenantId}/info`).then((res : any) =>{
            tenantInfo = res.data.tenant;
        })
        .catch((err : any) => {
            console.log(err);
            return;
        });
        
        
        if(languageToBeDeleted != defaultLanguage){
            const newList = tenantLanguages.filter((language : any) => language !== languageToBeDeleted);
            setTenantLanguages(newList);
            if(tenantInfo) tenantInfo.languages = newList;
            console.log(tenantInfo);
            await putData(`http://localhost:3000/dev/${tenantId}/update`, tenantInfo).then((res : any) => { //MANCA QUESTA API
              console.log("put",res);          
            })
            .catch((err : any) =>{
                console.error(err);
            })
        }
        else{
            alert('You cannot remove the default language from the list');
        }
    }

    const handleLanguageChange = (e : any) => {
        console.log(e.target.value);
        setNewLanguage(e.target.value);
    }

    let {tenantId} = useParams<string>();
    if (typeof tenantId == 'undefined') tenantId = 'tenant1';


    const addLanguage = async () => {
        if(newLanguage != undefined && !tenantLanguages.includes(newLanguage)){
            let tenantInfo : any;
            await getData(`http://localhost:3000/dev/${tenantId}/info`).then((res : any) =>{
                tenantInfo = res.data.tenant;
            })
            .catch((err : any) => {
                console.log(err);
                return;
            });
            
            const newList = [...tenantLanguages, newLanguage]
            setTenantLanguages(newList);
            if(tenantInfo) tenantInfo.languages = newList;
            if(defaultLanguage == '') setDefaultLanguage(newLanguage);

            await putData(`http://localhost:3000/dev/${tenantId}/update`, tenantInfo).then((res : any) => { //MANCA QUESTA API
            console.log("put",res);          
            })
            .catch((err : any) =>{
                console.error(err);
            })
        }
    }
    
    return(
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',}}
        >    
            <Grid container columnSpacing={5} rowSpacing={5} minHeight={'100vh'}>
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}} onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Grid container columnSpacing={5} rowSpacing={5}>
                        {/* <Grid item xs={12}>
                            <Grid container sx={{position:'relative'}}>
                                <TextField label='Tenant id' fullWidth value={tenantId} disabled>
                                </TextField>
                                <Button variant='contained' sx={{position:'absolute', height:'100%', right:'0', top:'50%', translate:'0 -50%', zIndex:'20'}}>Copy</Button>
                            </Grid>
                        </Grid> */}
                        <Grid item xs={12} sm={5}>
                            <Grid container columnSpacing={5} rowSpacing={5}>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' href='./tenantSettings/users'>
                                        Go to user list
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h6' component='h3'>Tenant's default language</Typography>
                                    <TextField label='Default language' fullWidth value={defaultLanguage} disabled></TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Grid container columnSpacing={5} rowSpacing={5}>
                                <Grid item xs={12}>
                                    <Grid container>
                                            <Typography variant='h6' component='h3'>Tenant's languages</Typography>
                                        <Grid item xs={10}>
                                            <LanguagePicker default='English' handleLanguageChange={handleLanguageChange}></LanguagePicker>
                                        </Grid>            
                                        <Grid item xs={2}>
                                            <IconButton onClick={addLanguage} sx={{display:'block', margin:'auto'}} aria-label="go to text editor for original text">
                                                <AddCircleOutlineIcon fontSize='large'/>
                                            </IconButton>
                                        </Grid>                    
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                {(tenantLanguages.length !== 0) ? 
                                    <Card>
                                    <List>
                                        {languageList}
                                    </List>
                                    </Card>        
                                    
                                    :
                                    
                                    <Card>
                                        <Typography padding={'2rem'} variant='h4' component='h2'>There's no languages in this tenant</Typography>
                                    </Card>
                                }

                                    {/* <TenantLanguagesList tenantLanguages={tenantLanguages} tenantId={tenantId}></TenantLanguagesList> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}