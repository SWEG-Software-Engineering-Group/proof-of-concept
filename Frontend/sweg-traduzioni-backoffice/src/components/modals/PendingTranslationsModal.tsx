import React, {useState, useEffect} from "react";
import { Card, Grid, Button, Typography, IconButton} from '@mui/material';
import ApproveDiscardButtons from "../ApproveDiscardButtons";
import { getData } from "../../functions/globals/axiosFunction";

export default function PendingTranslationsModal(props:any) {

    const [original, setOriginal] = useState<string>();
    let tenantId = 'tenant1';


    useEffect(()=>{
        if(props.translationToBeReviewed){
            getData(`http://localhost:3000/dev/${tenantId}/Text`)
            .then((res : any) => {
                console.log(res.data.data.texts);
                setOriginal(res.data.data.texts.find((text : any) => text.key===props.translationToBeReviewed.key).text);
            })
        }
    },[])

    const handleDiscard = () =>{
        //elimina la traduzione che era a schermata e fa la relativa chiamata API
        props.discardTranslation();
        props.closeModal();//chiude il modal
        props.openModal();//riapre il modal e quindi facendolo carica un'altra traduzione da valutare
    }
    const handleAccept = () =>{
        //accetta la traduzione tramite API
        props.acceptTranslation();
        props.closeModal();//chiude il modal
        props.openModal();//riapre il modal e quindi facendolo carica un'altra traduzione da valutare
    }
    
    return(
        <Grid container wrap="nowrap" sx={{
            flexDirection:'column',
            gap:'2rem',
            translate: '',
            width: '95%',
            margin: 'auto',
        }}>
            <Grid item xs={12}>
                <Card elevation={5} sx={{padding:'1.5rem'}}>
                    <Typography sx={{color:'primary.main'}} variant='h4'>Original</Typography>
                    {original ? original : ''}
                </Card>
        
            </Grid>
            <Grid item xs={12}>
                <Card elevation={5} sx={{padding:'1.5rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h4'>Translation</Typography>
                        {props.translationToBeReviewed ? props.translationToBeReviewed.text : null}
                </Card>
            </Grid>
            <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/>
        </Grid>                
    )
}