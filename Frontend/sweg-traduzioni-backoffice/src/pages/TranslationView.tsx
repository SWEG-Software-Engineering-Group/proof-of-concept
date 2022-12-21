import { Card, TextField, Grid, Button, Typography, List, ListItem} from '@mui/material';
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ConfirmCancelButtons from '../components/ConfirmCancelButtons'
import { display } from '@mui/system';

export default function TranslationView(){
    //hooks
    const [text, setText] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const {translationId, language} = useParams();
    
    //logics
    
    //ui
    return(
        <div style={{
            width:'75vw',
            margin:'2rem auto',}}
        >
            <Grid container spacing={2} sx={{marginBottom:'2rem'}}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{padding:'1.5rem', height:'10rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h6'>Comments</Typography>
                        <Typography sx={{maxHeight:'100%', overflow:'scroll'}}>This is a comment... Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium laboriosam officiis dolore ipsum tenetur. Ex nam quod blanditiis earum fuga.</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
            </Grid>
            <Grid container wrap="nowrap" sx={{                
                    flexDirection:'column',
                    gap:'2rem',
                    translate: '' 
                }}>
                <Grid item xs={12}>
                    <Card elevation={5} sx={{padding:'1.5rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h4'>Original</Typography>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis. Enim veritatis sint eveniet magnam pariatur maxime facere ratione saepe voluptates, sit facilis eligendi fugiat explicabo eius perspiciatis labore praesentium?
                    Pariatur temporibus impedit praesentium eaque, dolore commodi reiciendis quasi aliquam accusamus sit voluptas asperiores eos tenetur! Modi laudantium quidem minima iusto ex. Voluptate cupiditate iste neque ipsam asperiores doloremque iusto!
                    Culpa minima explicabo et officia, sunt officiis quia sequi doloribus delectus aspernatur ullam repudiandae repellat! Tempora, cum similique illo sit magni nemo vitae sint perferendis at, voluptatem facere. Suscipit, excepturi!
                    Quidem error quod voluptatum nam qui soluta beatae minima asperiores, ab hic nisi culpa esse corporis alias debitis vero molestias voluptas necessitatibus rem tempore sint in minus. Commodi, mollitia doloribus!
                    Eaque sunt modi odit nam, voluptas aperiam non esse, nemo magnam et, culpa dignissimos! Nemo harum temporibus quos nobis quasi suscipit omnis sed saepe ipsam doloribus facere, iste praesentium autem.
                    Sequi odit vitae esse nam eveniet quae aspernatur deleniti reprehenderit adipisci magnam ipsam vero quisquam molestiae praesentium iure iste soluta hic, dolor fuga accusamus fugiat! Nulla porro dicta voluptatem. Praesentium.
                    Magni natus quam iste ea tenetur hic commodi id reiciendis eligendi, quas eius cupiditate unde! Obcaecati explicabo aliquam voluptatibus dicta alias ipsam consequatur iure reiciendis quibusdam, facilis odio doloribus incidunt.
                    Ipsum officia ea fugiat dicta, inventore explicabo. Natus fugiat dolore odio nesciunt! Temporibus, architecto magnam accusamus suscipit sunt ex, placeat inventore, ut fuga distinctio perferendis impedit debitis rem amet aperiam!
                    Libero mollitia dicta autem eaque hic? Quibusdam eos dignissimos sit, alias error dolorum saepe asperiores repellat iusto incidunt tempora inventore dolores repellendus maxime aspernatur quo tenetur accusamus! Perferendis, esse nesciunt.
                    Vitae possimus maxime accusamus pariatur deserunt molestias odit nemo officia amet alias, natus necessitatibus qui tempore ullam, nobis voluptas iure, tempora iusto cupiditate enim vero. Numquam sit laudantium vero quidem?
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={10} label="Translation"></TextField>
                </Grid>
                <ConfirmCancelButtons to='/todo'/>
            </Grid>
        </div>
    )
}