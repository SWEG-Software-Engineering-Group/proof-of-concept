import React from "react";
import { Card, Grid, Button, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function EmptyModal(props:any) {
    
    const visible = props.open ? 'visible' : 'hidden';
    const handleAccept = () =>{
        
    }

    return(
        <Card style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width:'75vw',
            height: '90vh',
            translate: '-50% -50%',
            visibility: visible,
            zIndex: '100',
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center'
        }}
        >
            <IconButton onClick={props.closeModal} sx={{position: 'absolute', right:'.5rem', top:'.5rem'}} aria-label="close modal">
                <CloseIcon />
            </ IconButton>
            <div style={{ height: '80%', width: '90%', padding:'1rem',
                overflow: 'scroll',
                }}>
                
                {props.specificModal}

            </div>
        </Card>
    )
}