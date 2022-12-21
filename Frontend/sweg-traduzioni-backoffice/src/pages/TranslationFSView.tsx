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


    //ui
    return (
        <>
        {folderId}
            <Grid container columnSpacing= {5} minHeight={'100vh'} padding={'1.5em'}>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined">Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={1}>
                        <TranslationFolder folderId='f1'></TranslationFolder>
                        <TranslationCard translationId='1'></TranslationCard>
                        <TranslationCard translationId='2'></TranslationCard>
                        <TranslationCard translationId='3'></TranslationCard>
                        <TranslationCard translationId='4'></TranslationCard>
                        <TranslationCard translationId='5'></TranslationCard>
                        <TranslationCard translationId='6'></TranslationCard>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <LanguagePicker/>
                </Grid>
            </Grid>
        </>
    )
} 