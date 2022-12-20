import { Button, Grid} from "@mui/material";
import React from "react";
import LanguagePicker from '../components/LanguagePicker';
import TranslationCard from "../components/TranslationCard";

export function TranslationFSView() {
    //hooks
    

    //logics


    //ui
    return (
        <>
            <Grid container columnSpacing= {5} minHeight={'100vh'} padding={'1.5em'}>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined">Log out</Button>
                </Grid>
                <Grid container spacing={1} xs={12} sm={8}>
                    <TranslationCard></TranslationCard>
                    <TranslationCard></TranslationCard>
                    <TranslationCard></TranslationCard>
                    <TranslationCard></TranslationCard>
                    <TranslationCard></TranslationCard>
                    <TranslationCard></TranslationCard>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <LanguagePicker/>
                </Grid>
            </Grid>
        </>
    )
} 