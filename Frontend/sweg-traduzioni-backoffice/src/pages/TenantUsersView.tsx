import { Button, Card, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TenantUsersList from '../components/TenantUsersList'
import { Link } from 'react-router-dom'
import { getData } from '../functions/globals/axiosFunction';

export default function TenantUsersView(){

    
    return(

<div style={{
            width:'85vw',
            margin:'1.5rem auto',
            minHeight:'calc(100vh - 3rem)',
        }}
        >
            <Grid container columnSpacing= {5} rowSpacing={5} >
                <Grid item xs={12} sm={2} >
                    <Button variant="outlined" sx={{display:'block', position:'sticky', zIndex:'20', top:'1.5rem'}}>Log out</Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                <Card>
                    <TenantUsersList tenantId='tenant1'/>
                </Card>
                </Grid>
            </Grid>
        </div>
    )
}