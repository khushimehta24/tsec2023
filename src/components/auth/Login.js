import { CardMedia, Grid } from '@mui/material'
import React from 'react'
import img from '../../images/image.png'
import LoginForm from '../forms/LoginForm'
function Login() {
    return (
        <Grid container>
            <Grid item md={4}>
                <CardMedia component='img' image={img} />
            </Grid>
            <Grid item md={2} />
            <Grid item md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <LoginForm />
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}

export default Login