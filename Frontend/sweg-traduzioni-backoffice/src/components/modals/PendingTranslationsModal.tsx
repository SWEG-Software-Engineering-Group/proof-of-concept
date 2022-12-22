import React from "react";
import { Card, Grid, Button, Typography, IconButton} from '@mui/material';
import ApproveDiscardButtons from "../ApproveDiscardButtons";

export default function PendingTranslationsModal(props:any) {

    
    const handleDiscard = () =>{
        //elimina la traduzione che era a schermata e fa la relativa chiamata API
        props.closeModal();//chiude il modal
        props.openModal();//riapre il modal e quindi facendolo carica un'altra traduzione da valutare
    }
    const handleAccept = () =>{
        //accetta la traduzione tramite API
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis. Enim veritatis sint eveniet magnam pariatur maxime facere ratione saepe voluptates, sit facilis eligendi fugiat explicabo eius perspiciatis labore praesentium?
                Pariatur temporibus impedit praesentium eaque, dolore commodi reiciendis quasi aliquam accusamus sit voluptas asperiores eos tenetur! Modi laudantium quidem minima iusto ex. Voluptate cupiditate iste neque ipsam asperiores doloremque iusto!
                Culpa minima explicabo et officia, sunt officiis quia sequi doloribus delectus aspernatur ullam repudiandae repellat! Tempora, cum similique illo sit magni nemo vitae sint perferendis at, voluptatem facere. Suscipit, excepturi!
                Quidem error quod voluptatum nam qui soluta beatae minima asperiores, ab hic nisi culpa esse corporis alias debitis vero molestias voluptas necessitatibus rem tempore sint in minus. Commodi, mollitia doloribus!
                Eaque sunt modi odit nam, voluptas aperiam non esse, nemo magnam et, culpa dignissimos! Nemo harum temporibus quos nobis quasi suscipit omnis sed saepe ipsam doloribus facere, iste praesentium autem.
                Sequi odit vitae esse nam eveniet quae
                </Card>
        
            </Grid>
            <Grid item xs={12}>
                <Card elevation={5} sx={{padding:'1.5rem'}}>
                        <Typography sx={{color:'primary.main'}} variant='h4'>Translation</Typography>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, officiis. Enim veritatis sint eveniet magnam pariatur maxime facere ratione saepe voluptates, sit facilis eligendi fugiat explicabo eius perspiciatis labore praesentium?
                    Pariatur temporibus impedit praesentium eaque, dolore commodi reiciendis quasi aliquam accusamus sit voluptas asperiores eos tenetur! Modi laudantium quidem minima iusto ex. Voluptate cupiditate iste neque ipsam asperiores doloremque iusto!
                    Culpa minima explicabo et officia, sunt officiis quia sequi doloribus delectus aspernatur ullam repudiandae repellat! Tempora, cum similique illo sit magni nemo vitae sint perferendis at, voluptatem facere. Suscipit, excepturi!
                    Quidem error quod voluptatum nam qui soluta beatae minima asperiores, ab hic nisi culpa esse corporis alias debitis vero molestias voluptas necessitatibus rem tempore sint in minus. Commodi, mollitia doloribus!
                    Eaque sunt modi odit nam, voluptas aperiam non esse, nemo magnam et, culpa dignissimos! Nemo harum temporibus quos nobis quasi suscipit omnis sed saepe ipsam doloribus facere, iste praesentium autem.
                    Sequi odit vitae esse nam eveniet quae
                </Card>
            </Grid>
            <ApproveDiscardButtons handleDiscard={handleDiscard} handleAccept={handleAccept}/>
        </Grid>                
    )
}