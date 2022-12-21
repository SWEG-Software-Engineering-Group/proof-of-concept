import { Button, Grid} from "@mui/material";
import React from "react";
import {useParams} from 'react-router-dom'
import LanguagePicker from '../components/LanguagePicker';
import TranslationCard from "../components/TranslationCard";
import TranslationFolder from "../components/TranslationFolder";

export function TranslationFSView(props:any) {
    //hooks
    let {folderId} = useParams<string>();
    if (typeof folderId == 'undefined') folderId = '0';
    
    //logics
    const handleLanguageChange = (e: any) => {
        
    }

    //ui
    return (
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',}}
        >
            <Grid container columnSpacing= {5} minHeight={'100vh'}>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined">Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={1}>
                        <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                        <TranslationFolder folderId='f1' />
                        <TranslationFolder folderId='f1' />
                        <TranslationFolder folderId='f1' />
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
                    <LanguagePicker handleLanguageChange={handleLanguageChange}/>
                </Grid>
            </Grid>
        </div>
    )
} 