import { Card, TextField, Grid, Button, Typography, List, ListItem} from '@mui/material';
import React, { useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons'
import { display } from '@mui/system';
import ApproveDiscardButtons from '../components/ApproveDiscardButtons';
import { getData, postData, putData } from '../functions/globals/axiosFunction';

export default function EditOriginalTextView(props : any){
    let navigate = useNavigate();
    //hooks
    // const [text, setText] = useState<string>('')
    // const [links, setLinks] = useState<string[]>([])
    // const {translationId, language} = useParams();
    
    // const navigate = useNavigate();

    // //logics
    // const confirmTranslation = (e:any) =>{
    //     e.preventDefault();
    //     //aggiungi traduzione al db
    //     console.log('traduzione aggiunta al db!')
    //     navigate(-1);
    // }


    //ui
    // return(
    //     <form style={{
    //         width:'75vw',
    //         margin:'2rem auto',}}
    //         noValidate
    //         autoCapitalize="off"
    //         onSubmit={(e) => confirmTranslation(e)}
    //     >
    //         <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
    //             <Grid item xs={12} sm={6}>
    //                 <Card sx={{padding:'1.5rem', height:'10rem'}}>
    //                     <Typography sx={{color:'primary.main'}} variant='h6'>Comments</Typography>
    //                     <Typography sx={{maxHeight:'100%', overflow:'scroll'}}>This is a comment... Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium laboriosam officiis dolore ipsum tenetur. Ex nam quod blanditiis earum fuga.</Typography>
    //                 </Card>
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //                 <Card sx={{padding:'1.5rem', height:'10rem'}}>
    //                     <Typography sx={{color:'primary.main'}} variant='h6'>Links</Typography>
    //                     <List sx={{maxHeight:'70%', overflow:'scroll'}}>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                         <ListItem>
    //                             <Link to=''>Let's go somewhere outside this website</Link>
    //                         </ListItem>
    //                     </List>
    //                 </Card>
    //             </Grid>
    //         </Grid>
    //         <Grid container wrap="nowrap" sx={{                
    //                 flexDirection:'column',
    //                 gap:'2rem',
    //                 translate: '' 
    //             }}>
    //             <Grid item xs={12}>
    //                 <Card elevation={5} sx={{padding:'1.5rem'}}>
    //                     <Typography sx={{color:'primary.main'}} variant='h4'>Original</Typography>
    //                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis. Enim veritatis sint eveniet magnam pariatur maxime facere ratione saepe voluptates, sit facilis eligendi fugiat explicabo eius perspiciatis labore praesentium?
    //                 Pariatur temporibus impedit praesentium eaque, dolore commodi reiciendis quasi aliquam accusamus sit voluptas asperiores eos tenetur! Modi laudantium quidem minima iusto ex. Voluptate cupiditate iste neque ipsam asperiores doloremque iusto!
    //                 Culpa minima explicabo et officia, sunt officiis quia sequi doloribus delectus aspernatur ullam repudiandae repellat! Tempora, cum similique illo sit magni nemo vitae sint perferendis at, voluptatem facere. Suscipit, excepturi!
    //                 Quidem error quod voluptatum nam qui soluta beatae minima asperiores, ab hic nisi culpa esse corporis alias debitis vero molestias voluptas necessitatibus rem tempore sint in minus. Commodi, mollitia doloribus!
    //                 Eaque sunt modi odit nam, voluptas aperiam non esse, nemo magnam et, culpa dignissimos! Nemo harum temporibus quos nobis quasi suscipit omnis sed saepe ipsam doloribus facere, iste praesentium autem.
    //                 Sequi odit vitae esse nam eveniet quae aspernatur deleniti reprehenderit adipisci magnam ipsam vero quisquam molestiae praesentium iure iste soluta hic, dolor fuga accusamus fugiat! Nulla porro dicta voluptatem. Praesentium.
    //                 Magni natus quam iste ea tenetur hic commodi id reiciendis eligendi, quas eius cupiditate unde! Obcaecati explicabo aliquam voluptatibus dicta alias ipsam consequatur iure reiciendis quibusdam, facilis odio doloribus incidunt.
    //                 Ipsum officia ea fugiat dicta, inventore explicabo. Natus fugiat dolore odio nesciunt! Temporibus, architecto magnam accusamus suscipit sunt ex, placeat inventore, ut fuga distinctio perferendis impedit debitis rem amet aperiam!
    //                 Libero mollitia dicta autem eaque hic? Quibusdam eos dignissimos sit, alias error dolorum saepe asperiores repellat iusto incidunt tempora inventore dolores repellendus maxime aspernatur quo tenetur accusamus! Perferendis, esse nesciunt.
    //                 Vitae possimus maxime accusamus pariatur deserunt molestias odit nemo officia amet alias, natus necessitatibus qui tempore ullam, nobis voluptas iure, tempora iusto cupiditate enim vero. Numquam sit laudantium vero quidem?
    //                 </Card>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <TextField fullWidth multiline rows={10} label="Translation"></TextField>
    //             </Grid>
    //             <ConfirmCancelButtons to='/todo'/>
    //         </Grid>
    //     </form>
    // )
    let tenantId = 'tenant1';
    const [data, setData] = useState<any>();
    const [text, setText] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [links, setLinks] = useState<string>('');

    //sarà da usare il parametro nell'url
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