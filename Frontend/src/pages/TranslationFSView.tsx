import { Button, Grid, IconButton} from "@mui/material";
import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import LanguagePicker from '../components/LanguagePicker';
import TranslationCard from "../components/TranslationCard";
import TranslationFolder from "../components/TranslationFolder";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewContentModal from "../components/modals/NewContentModal";
import EmptyModal from "../components/modals/EmptyModal";
import { getData } from "../functions/globals/axiosFunction";


export function TranslationFSView(props:any) {
    let tenantId = 'tenant1'
    let {folderId} = useParams<string>();
    if (typeof folderId === 'undefined') folderId = 'index';
    
    //hooks
    const [languages, setLanguages] = useState<string[]>([]);
    const [workingLanguage, setWorkingLanguage] = useState<string>('');
    const [allTextsData, setAllTextsData] = useState<any>();
    const [workingLanguageUntranslatedTextsData, setWorkingLanguageUntranslatedTextsData] = useState<any>();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [textComponents, setTextComponents] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        if ( localStorage.getItem('tipo-di-utente') === "superadmin" ) {
            navigate("/superAdmin");
        }
      }, []);


    useEffect(()=>{
        //immediately-invoked function expression in order to use async-await (non usata appieno ma la lascio per ricordare la sintassi e in caso possa servire)

        getData(`http://localhost:3000/dev/tenant1/info`)
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
    }, [])

    useEffect(()=>{
        if(workingLanguage !== ''){
            getData(`http://localhost:3000/dev/tenant1/untraslated/${workingLanguage}`)
            .then((res : any) =>{
                setWorkingLanguageUntranslatedTextsData(res.data.texts);
            })
            .catch((err : any)=>{
                console.log(err);
            });    
        }
    }, [workingLanguage])


    useEffect(()=>{
    (async()=>{
        await getData(`http://localhost:3000/dev/${tenantId}/allTexts`)
        .then((res : any) =>{
            setAllTextsData(res.data.data.find((language : any) => language.original === true).texts);
        })
        .catch((err : any) =>{
            console.log(err);
        })
    })();
    },[languages, workingLanguage])

    useEffect(()=>{
        if(allTextsData){
            setTextComponents(allTextsData.map((info : any) =>{
                if(workingLanguageUntranslatedTextsData){
                if(workingLanguageUntranslatedTextsData.find((infoToFind : any) => {
                    return infoToFind.key === info.key}))
                    return <TranslationCard key={info.key + info.group} language={workingLanguage} translationId={info.key} text={info.text} />
                else
                    return <TranslationCard blocked={true} key={info.key + info.group} language={workingLanguage} translationId={info.key} text={info.text} />
                }
            }))
        }
    },[allTextsData, workingLanguage])

    //logics
    const handleLanguageChange = (e: any) => {
        console.log(e.target.value);
        setWorkingLanguage(e.target.value);
    }
    const closeModal = () =>{
        setVisibleModal(false);
    }
    const openModal = (data:string) =>{
        setVisibleModal(true);
    }

    //ui
    return (
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',}}
        >
            <Grid container columnSpacing= {5} rowSpacing={5} minHeight={'100vh'}>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined" onClick={() => navigate("/login")}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={1}>
                        {/* <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                        <TranslationFolder folderId='f1' />
                        <TranslationFolder folderId='f2' />
                        <TranslationFolder folderId='f3' />
                        </Grid>    */}
                        <Grid container spacing={1}>
                            {textComponents || null}
                        </Grid>   
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                {workingLanguage === '' ? null : <LanguagePicker default={workingLanguage} secondaryLanguages={languages} handleLanguageChange={handleLanguageChange}></LanguagePicker> }
                </Grid>                
                

                {localStorage.getItem('tipo-di-utente') === "admin" ?
                <IconButton onClick={() => setVisibleModal(true)} sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                    <AddCircleOutlineIcon fontSize='large'/>
                </ IconButton>
                    :
                    <></>
                }
            </Grid>

            {localStorage.getItem('tipo-di-utente') === "admin" ?
            <EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewContentModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
            : <></>
                        }
        </div>
    )
} 