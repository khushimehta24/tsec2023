import { TextField, Checkbox, CardMedia, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from '../../app/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));




function ModalOneContent({ activeStep, setActiveStep, json, setJson }) {
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }
    return (
        <>
            <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                <h1 style={{ backgroundImage: 'linear-gradient(275.71deg, #7D93AF -50.16%, #BC09C7 124.58%)', marginTop: '3%', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}> Hi, Good to see you!</h1>
                <Grid sx={{ width: '100%' }}>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Name</p>
                    <TextField sx={{ width: '100%' }} name='name' value={json.name} onChange={handleChange} placeholder='Name' />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Email</p>
                    <TextField sx={{ width: '100%' }} name='email' value={json.email} onChange={handleChange} placeholder='Email' />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Phone Number</p>
                    <TextField sx={{ width: '100%' }} name='phone' value={json.phone} onChange={handleChange} placeholder='Phone Number' />

                </Grid>
            </Grid >
        </>
    )
}

export default ModalOneContent