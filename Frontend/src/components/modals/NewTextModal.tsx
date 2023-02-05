import React, { useState } from "react";
import { Card, Grid, Button, Typography, IconButton, TextField} from '@mui/material';
import ApproveDiscardButtons from "../ApproveDiscardButtons";
import { getData, postData } from "../../functions/globals/axiosFunction";

export default function NewTextModal(props:any) {
    let tenantId = 'tenant1';
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const [links, setLinks] = useState<string>('');

    const handleDiscard = () =>{
        //resetta testo nell'input field
        setText('');
        setComment('');
        setGroup('');
        setLinks('');
        props.closeModal();
    }
    const handleAccept = async () =>{
        //chiamate api per creare il nuovo testo
        let key = await getData('http://localhost:3000/dev/tenant1/allTexts')
        .then((res : any) => {
            return res.data.data[0].texts.length.toString();
        });        
        const data = {
            comment,
            text,
            key,
            group : group.trim() === '' ? 'index' : group.trim(),
            review : false,
        }
        console.log(data);
        if(text != ''){
        postData(`http://localhost:3000/dev/${tenantId}/insertText`, data).then(()=>{
            setText('');
            setGroup('');
            setComment('');
            setLinks('');
            props.closeModal();//chiude il modal
        })
        .catch((err : any) => {
            console.log(err)
        });
        }
        else{
            alert('Text must not be empty')
        }
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
                <Typography variant={'h4'} component={'h2'}>Enter a new text to be translated</Typography>            
                <TextField required multiline rows={'5'} fullWidth onChange={(e)=> setText(e.target.value)} value={text}>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Enter additional comments</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setComment(e.target.value)} value={comment}>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>In what category does this text belong? If nothing is written default is "index"</Typography>            
                <TextField fullWidth onChange={(e)=> setGroup(e.target.value)} value={group}>
                </TextField>
            </Grid>
            {/* <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Enter a list of links separated by commas if needed (not used for PoC)</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setLinks(e.target.value)} value={links}>
                </TextField>
            </Grid> */}
            <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/>
        </Grid>
    )
}

//la categoria di appartenza del testo viene ricavata dalla cartella in cui viene aggiunto, altrimenti appartiene all' 'index'