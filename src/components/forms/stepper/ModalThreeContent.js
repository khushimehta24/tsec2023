import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useContext } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthServices from '../../../services/AuthServices';
import { offerContext } from '../../../offerContext';
import { useNavigate } from 'react-router';

function ModalThreeContent() {
    const [json, setJson] = useState({
        emailotp: '',
        phoneotp: ''
    })
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(false)
    const [load2, setLoad2] = useState(false)
    const { user, token } = useContext(offerContext)
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }

    const verifyPAN = async () => {
        setLoading(true)
        await AuthServices.panVerify({
            'pan': value
        }, token)
            .then((res) => {
                console.log(res);
                setLoading(false)
                setLoad2(true)
            }).catch((e) => {
                console.log(e)
                setLoading(false)
            })
    }

    const verifyEmail = async () => {
        setLoad(true)
        await AuthServices.verifyOTP(json, token)
            .then((res) => {
                console.log(res);
                setLoad(false)
                navigate('/')
            }).catch((e) => {
                console.log(e)
                setLoad(false)
            })
    }

    const handleChangeEmail = (newvalue) => {
        setJson({ ...json, 'emailotp': newvalue });
    }

    const handleChangePhone = (newvalue) => {
        setJson({ ...json, 'phoneotp': newvalue });
    }

    return (
        <>
            <Grid container sx={{ marginTop: '3%' }}>

                <Grid item md={9}>
                    <TextField placeholder='Enter your PAN card number' sx={{ width: '100%' }} type='text' value={value} onChange={(e) => setValue(e.target.value)} />
                </Grid>
                <Grid item md={3} sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {
                        !loading ? <CheckCircleIcon sx={{ height: '100%', fontSize: '3rem', cursor: 'pointer' }} onClick={verifyPAN} /> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                        </Box>
                    }
                </Grid>

                {load2 && <><Grid item md={12}>
                    <p style={{ fontSize: '12px', marginTop: '5%' }}>Verify Email <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> </p>
                    {/* <TextField sx={{ width: '100%' }} value={json.emailotp} onChange={handleChange} name='emailotp' length={6} /> */}
                    <MuiOtpInput
                        length={6}
                        value={json.emailotp} onChange={handleChangeEmail}
                    />
                </Grid>
                    <Grid item md={12}>
                        <p style={{ fontSize: '12px', marginTop: '5%' }}>Verify Phone Number <ArrowForwardIosIcon sx={{ fontSize: '12px' }} /> </p>
                        {/* <TextField sx={{ width: '100%' }} value={json.phoneotp} onChange={handleChange} name='phoneotp' length={6} /> */}
                        <MuiOtpInput
                            length={6}
                            value={json.phoneotp} onChange={handleChangePhone}
                        />
                    </Grid>
                    <Grid item md={12} sx={{ marginTop: '5%' }}>
                        {
                            !load ? <Button onClick={verifyEmail} sx={{ textTransform: 'none', height: '3.5rem', width: '100%', border: '2px solid #BC09C7', '&:hover': { border: '2px solid #BC09C7 !important', backgroundColor: 'white !important', color: '#BC09C7 !important' } }} > Verify</Button> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                            </Box>
                        }
                    </Grid></>}
            </Grid>
        </>
    )
}

export default ModalThreeContent