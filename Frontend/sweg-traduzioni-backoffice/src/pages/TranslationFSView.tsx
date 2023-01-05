import { Button, Grid, IconButton} from "@mui/material";
import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import LanguagePicker from '../components/LanguagePicker';
import TranslationCard from "../components/TranslationCard";
import TranslationFolder from "../components/TranslationFolder";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewContentModal from "../components/modals/NewContentModal";
import EmptyModal from "../components/modals/EmptyModal";


export function TranslationFSView(props:any) {
    //hooks
    let {folderId} = useParams<string>();
    if (typeof folderId == 'undefined') folderId = '0';
    

    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    //logics
    const handleLanguageChange = (e: any) => {
        
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
                    <Button variant="outlined">Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={1}>
                        <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                        <TranslationFolder folderId='f1' />
                        <TranslationFolder folderId='f2' />
                        <TranslationFolder folderId='f3' />
                        </Grid>   
                        <Grid container spacing={1}>
                            <TranslationCard translationId='1' />
                            <TranslationCard translationId='2' />
                            <TranslationCard translationId='3' />
                            <TranslationCard translationId='4' />
                            <TranslationCard translationId='5' />
                            <TranslationCard translationId='6' />
                        </Grid>   
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <LanguagePicker handleLanguageChange={handleLanguageChange} default={'English'}/>
                </Grid>                
                
                <IconButton onClick={() => setVisibleModal(true)} sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%', }} aria-label="go to text editor for original text">
                    <AddCircleOutlineIcon fontSize='large'/>
                </ IconButton>
            </Grid>

            <EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewContentModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
        </div>
    )
} 