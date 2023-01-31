import React, {useEffect, useState} from "react";
import {Grid, Button, Card, CardActionArea, CardContent, Typography} from "@mui/material"
import {Link, useNavigate} from "react-router-dom";
import { IconButton } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import PendingTranslationsModal from "../components/modals/PendingTranslationsModal";
import { display } from "@mui/system";
import displayOnePendingTranslation from '../functions/displayOnePendingTranslation'
import EmptyModal from "../components/modals/EmptyModal";
import NewFolderModal from "../components/modals/NewFolderModal";
import NewContentModal from "../components/modals/NewContentModal";
import { getData } from "../functions/globals/axiosFunction";
import LanguagePicker from "../components/LanguagePicker";
export default function AdminView()
{
    const [pending, setPending] = useState<string[]>([]);  //string[] id delle traduzioni da controllare
    const [languages, setLanguages] = useState<string[]>([]);
    const [workingLanguage, setWorkingLanguage] = useState<string>('');
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const navigate = useNavigate();


    let tenantId = 'tenant1';

    useEffect(() => {
        if ( localStorage.getItem('tipo-di-utente') == "user" ) {
            navigate("/todo");
        }
        if ( localStorage.getItem('tipo-di-utente') == "superadmin" ) {
            navigate("/superAdmin");
        }
      }, []);


    useEffect(()=>{
        //immediately-invoked function expression in order to use async-await (non usata appieno ma la lascio per ricordare la sintassi e in caso possa servire)
        (async () =>{
            await getData(`http://localhost:3000/dev/${tenantId}/info`)
            .then((res : any) =>{
                setLanguages(res.data.tenant.languages.filter((language : any) => {
                return language !== res.data.tenant.mainlang;
                }));
                console.log(res.data.tenant);
                setWorkingLanguage(res.data.tenant.languages.filter((language : any) => {
                    return language !== res.data.tenant.mainlang;
                    })[0]);
            })
            .catch((err : any)=>{
                console.log(err);
            });
            console.log(languages);
        })();

    }, [])

    useEffect(()=>{
        if(workingLanguage !== ''){
            getData(`http://localhost:3000/dev/tenant1/untraslated/${workingLanguage}`)
            .then((res : any) =>{
                setPending(res.data.texts);
            })
            .catch((err : any)=>{
                console.log(err);
            });    
        }
    }, [workingLanguage])

    const closeModal = () =>{
        setVisibleModal(false);
    }
    const openModal = (data:string) =>{
        displayOnePendingTranslation(data); //forse da mettere dentro il PendingTranslationsModal e rendere closeModal e openModal delle funzioni esterne a questo componente
        setVisibleModal(true);
    }

    const handleLanguageChange = (e : any) => {
        console.log(e.target.value);
        setWorkingLanguage(e.target.value);
    }


    return(
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',
            minHeight:'calc(100vh - 3rem)',
        }}
        >
            <Grid container columnSpacing={5} rowSpacing={3}>
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}} onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Card sx={{bgcolor:'primary.main'}}>
                                <CardActionArea onClick={() => setVisibleModal(true)}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Review
                                            <span style={{color:'white'}}>{` ${pending.length} `}</span>
                                            pending translations
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card sx={{bgcolor:'secondary.main'}}>
                                <Link to={`/todo/`} style={{textDecoration:"none"}}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Go to the translation hub
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2}>
                    {workingLanguage === '' ? null : <LanguagePicker default={workingLanguage} secondaryLanguages={languages} handleLanguageChange={handleLanguageChange}></LanguagePicker> }
                </Grid>
                <Grid item xs={12} sm={2} >
                    <Link to='/admin/tenantSettings'>
                        <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%'}} aria-label="go to text editor for original text">
                            <Settings fontSize='large'/>
                        </ IconButton>
                    </Link>
                </Grid>
            </Grid>
            <EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<PendingTranslationsModal closeModal={closeModal} openModal={openModal} translations={pending}/>}></EmptyModal>
        </div>
    )
}


//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewContentModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewFolderModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>



//<PendingTranslationsModal open={visibleModal} closeModal={closeModal} openModal={openModal}/> //OLD WAY, keeping just in case of rollback