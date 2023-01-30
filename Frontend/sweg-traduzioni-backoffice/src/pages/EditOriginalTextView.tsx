import { Card, TextField, Grid, Button, Typography, List, ListItem} from '@mui/material';
import React, { useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons'
import { display } from '@mui/system';
import ApproveDiscardButtons from '../components/ApproveDiscardButtons';
import { getData, postData, putData } from '../functions/globals/axiosFunction';

export default function EditOriginalTextView(props : any){
    let tenantId = 'tenant1';
    
    let navigate = useNavigate();
    const [data, setData] = useState<any>();
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [links, setLinks] = useState<string>('');

    let {translationId} = useParams<string>();
    if (typeof translationId == 'undefined') translationId = '0';
    console.log('translation id = key', translationId);
    
    let cont = 0;   //usata perchè se no navigate(-1) veniva richiamata 2 volte facendoci tornare indietro di due pagine invece che di una sola
    useEffect(()=>{
        getData(`http://localhost:3000/dev/${tenantId}/Text`)
        .then((res : any) =>{
            if(res.data.data.texts.find((text : any) => text.key==translationId) !== undefined)
            setData(() => res.data.data.texts.find((text : any) => text.key==translationId))
            else{
                alert(`There is no text with key=${translationId}`);
                cont++;
                if(cont == 2)
                    navigate(-1);
            }
        })
        .catch((err : any) => {
        });
    },[]);

    useEffect(()=>{
        if (data){
        setText(data.text);
        setComment(data.comment);
        //setLinks(data.links);
        }
    },[data]);

    const handleConfirm = async () =>{
        //chiamate api per creare il nuovo testo
        console.log(data);

        const dataToBeSent = {
            text,
            comment,
            key : translationId,
            group : data.group,
        }
        if(text != ''){
        putData(`http://localhost:3000/dev/${tenantId}/English/putText`, dataToBeSent).then(()=>{
            setText('');
            setComment('');
            setLinks('');
            // props.closeModal();//chiude il modal
            navigate(-1);
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
                <Typography variant={'h4'} component={'h2'}>Edit original text to be translated</Typography>            
                <TextField required multiline rows={'5'} fullWidth onChange={(e)=> setText(e.target.value)} value={text}>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Edit additional comments</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setComment(e.target.value)} value={comment}>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Edit a list of links separated by commas if needed (not used for PoC)</Typography>            
                <TextField multiline rows={'5'} fullWidth onChange={(e)=> setLinks(e.target.value)} value={links}>
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={'h6'} component={'h3'}>Original category</Typography>            
                <TextField disabled fullWidth value={data ? (data.group || ''): ''}>
                </TextField>
            </Grid>
            {/* <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/> */}
            <ConfirmCancelButtons to='/todo' handleConfirm={handleConfirm}/>
        </Grid>
    )
}