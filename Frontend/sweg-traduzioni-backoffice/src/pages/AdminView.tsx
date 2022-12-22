import React, {useState} from "react";
import {Grid, Button, Card, CardActionArea, CardContent, Typography} from "@mui/material"
import {Link} from "react-router-dom";
import { IconButton } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import PendingTranslationsModal from "../components/modals/PendingTranslationsModal";
import { display } from "@mui/system";
import displayOnePendingTranslation from '../functions/displayOnePendingTranslation'
import EmptyModal from "../components/modals/EmptyModal";
import NewFolderModal from "../components/modals/NewFolderModal";
import NewContentModal from "../components/modals/NewContentModal";
export default function AdminView()
{
    const [pending, setPending] = useState<string[]>(['a', 'b', 'c']);  //string[] id delle traduzioni da controllare
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const closeModal = () =>{
        setVisibleModal(false);
    }
    const openModal = (data:string) =>{
        displayOnePendingTranslation(data); //forse da mettere dentro il PendingTranslationsModal e rendere closeModal e openModal delle funzioni esterne a questo componente
        setVisibleModal(true);
    }

    return(
        <div style={{
            width:'85vw',
            margin:'1.5rem auto',
            minHeight:'calc(100vh - 3rem)',
        }}
        >
            <Grid container columnSpacing= {5} >
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Card sx={{bgcolor:'primary.main'}}>
                                <CardActionArea onClick={() => setVisibleModal(true)}>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Review
                                            <span style={{color:'white'}}>{` ${pending.length} `}</span>
                                            pending translations
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Card sx={{bgcolor:'secondary.main'}}>
                                <Link to={`/todo/`} style={{textDecoration:"none"}}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant="h5">
                                                Go to the translation hub
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={2} >
                    <Link to='/admin/tenantSettings'>
                        <IconButton sx={{padding: 0, position:'fixed', bottom:'2rem', right:'2rem', scale:'200%'}} aria-label="go to text editor for original text">
                            <Settings fontSize='large'/>
                        </ IconButton>
                    </Link>
                </Grid>
            </Grid>
            <EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewContentModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
        </div>
    )
}


//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<PendingTranslationsModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>
//<EmptyModal open={visibleModal} closeModal={closeModal} openModal={openModal} specificModal={<NewFolderModal closeModal={closeModal} openModal={openModal}/>}></EmptyModal>



//<PendingTranslationsModal open={visibleModal} closeModal={closeModal} openModal={openModal}/> //OLD WAY, keeping just in case of rollback