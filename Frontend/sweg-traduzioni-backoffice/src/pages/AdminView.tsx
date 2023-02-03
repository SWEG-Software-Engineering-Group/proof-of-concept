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
import { deleteData, getData, putData } from "../functions/globals/axiosFunction";
import LanguagePicker from "../components/LanguagePicker";
export default function AdminView()
{
    const [pending, setPending] = useState<any[]>();
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
                setWorkingLanguage(res.data.tenant.languages.filter((language : any) => {
                    return language !== res.data.tenant.mainlang;
                    })[0]);
            })
            .catch((err : any)=>{
                console.log(err);
            });
        })();

    }, [])

    useEffect(()=>{
        if(workingLanguage !== ''){
            console.log(workingLanguage);
            getData(`http://localhost:3000/dev/tenant1/${workingLanguage}/Text`)
            .then((res : any) =>{
                if(res.data.data.texts){
                let aux = res.data.data.texts.filter((text : any) => text.review === true);
                setPending(aux);
                }
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
        setWorkingLanguage(e.target.value);
    }

    const acceptTranslation = () =>{
        if(pending){
            pending[0].review = false;
            putData(`http://localhost:3000/dev/${tenantId}/${workingLanguage}/putText`, pending[0]).then(()=>{pending.shift()})
        }
    }

    const discardTranslation = () =>{
        if(pending){
            pending[0].review = false;
            deleteData(`http://localhost:3000/dev/${tenantId}/${workingLanguage}/${pending[0].key}/${pending[0].group}/removeTranslationText`).then(()=>{pending.shift()})
        }
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
                                {pending && pending.length!==0 ?                                
                                <CardActionArea onClick={() => setVisibleModal(true)}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            <span style={{color:'white'}}>Review {` ${pending.length} `} pending translations</span>                                                                                                                                    
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                : 
                                <CardActionArea onClick={() => null}>
                                <CardContent>
                                    <Typography variant="h5">
                                        <span style={{color:'white'}}> There is no pending translation to review for this language</span>
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                }
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
            {pending && pending.length!==0  ? <EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<PendingTranslationsModal translationToBeReviewed={pending[0] ? pending[0] : null} closeModal={closeModal} openModal={openModal} acceptTranslation={acceptTranslation} discardTranslation={discardTranslation}/>}></EmptyModal> : <></>}
        </div>
    )
}


//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewContentModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewFolderModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>



//<PendingTranslationsModal open={visibleModal} closeModal={closeModal} openModal={openModal}/> //OLD WAY, keeping just in case of rollback