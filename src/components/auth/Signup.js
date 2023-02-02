import { CardMedia, Grid } from '@mui/material'
import React from 'react'
import img from '../../images/image.png'
import SignupForm from '../forms/SignupForm'

function Signup() {
    return (
        <Grid container>
            <Grid item md={4}>
                <CardMedia component='img' image={img} />
            </Grid>
            <Grid item md={2} />
            <Grid item md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <SignupForm />
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}

export default Signup