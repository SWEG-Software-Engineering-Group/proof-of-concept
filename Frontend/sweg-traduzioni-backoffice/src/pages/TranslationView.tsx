import { Card, TextField, Grid, Button, Typography, List, ListItem} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons'
import { display } from '@mui/system';
import { getData, postData } from '../functions/globals/axiosFunction';

export default function TranslationView(){
    let tenantId = 'tenant1';
    //hooks
    const navigate = useNavigate();
    const [data, setData] = useState<any>();
    const [originalText, setOriginalText] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    
    let {translationId, language} = useParams<string>();
    if (typeof translationId == 'undefined') translationId = '0';

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
        setOriginalText(data.text);
        setComment(data.comment === null ? '' : data.comment );
        //setLinks(data.links);
        }
    },[data]);

    
    //logics
    const handleConfirm = (e:any) =>{
        e.preventDefault();
        //aggiungi traduzione al db
        
        const dataToBeSent = {
            comment,
            text,
            key : translationId,
            group : data.group,
            review : true,
        }

        if(text != ''){
            console.log(tenantId, language, translationId, data.group);
            postData(`http://localhost:3000/dev/${tenantId}/${language}/translate`, dataToBeSent)
            .then((res : any)=>{
                console.log(res);
                setText('');
                // props.closeModal();//chiude il modal
                navigate(-1);
            })
            .catch((err : any) => {
                console.log(dataToBeSent);
                console.log(err)
            });
        }
        else{
            alert('Text must not be empty');
        }

        console.log('traduzione aggiunta al db!')
        //navigate(-1);
    }


    //ui
    return(
        <form style={{
            width:'75vw',
            margin:'2rem auto',}}
            noValidate
            autoCapitalize="off"
            onSubmit={(e) => handleConfirm(e)}
        >
            <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                <Grid item xs={12} sm={12}>
                    <Card elevation={5} sx={{padding:'1.5rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h6'>Comments</Typography>
                        <Typography /*</Card>sx={{height:'90%', overflow:'scroll'}}*/>{comment || ''}</Typography>
                    </Card>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <Card sx={{padding:'1.5rem', height:'10rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h6'>Links</Typography>
                        <List sx={{maxHeight:'70%', overflow:'scroll'}}>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                            <ListItem>
                                <Link to=''>Let's go somewhere outside this website</Link>
                            </ListItem>
                        </List>
                    </Card>
                </Grid> */}
            </Grid>
            <Grid container wrap="nowrap" sx={{                
                    flexDirection:'column',
                    gap:'2rem',
                    translate: '' 
                }}>
                <Grid item xs={12}>
                    <Card elevation={5} sx={{padding:'1.5rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h4'>Original</Typography>
                        <Typography>{originalText || ''}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={10} label="Translation" onChange={(e)=> setText(e.target.value)} value={text}></TextField>
                </Grid>
                <ConfirmCancelButtons to='/todo' handleConfirm={handleConfirm} />
            </Grid>
        </form>
    )
}