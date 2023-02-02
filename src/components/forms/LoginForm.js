import { TextField, Checkbox, CardMedia, Grid } from '@mui/material';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from '../app/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import userImg from '../../images/user.png'
import AuthServices from '../../services/AuthServices';
import { offerContext } from '../../offerContext';
import successHandler from '../../helpers/successHandler';
import errorHandler from '../../helpers/errorHandler';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center', width: '100%' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));


const initialValues = {
    email: '',
    password: '',
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
});



function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [json, setJson] = useState({
        "email": '',
        "password": ''
    })

    const [remember, setRemember] = useState(false)
    const { user, setUser, token, setToken } = useContext(offerContext)
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setLoading(true)
        await AuthServices.login(json)
            .then((res) => {
                setUser(res.data.user)
                setToken(res.data.token)
                localStorage.setItem("ccpUser", JSON.stringify(res.data.user))
                localStorage.setItem("ccpToken", res.data.token)
                successHandler('Successfully logged in')
                setLoading(false)
                navigate('/')
            }).catch((e) => {
                console.log(e);
                setLoading(false)
                errorHandler(e.response.data.message)
            })
    }

    return (
        <>
            <CardMedia component='img' image={userImg} sx={{ width: '40%' }} />
            <h4 style={{ color: '#3F454F' }}>Hi, Welcome Back!</h4>
            <Grid item sx={{ width: '100%' }}>
                <p style={{ fontSize: '12px' }}>Password</p>
                <TextField sx={{ width: '100%' }} type='email' name='email' value={json.email} onChange={handleChange} placeholder='Wmail' />
                <p style={{ fontSize: '12px' }}>Password</p>
                <TextField sx={{ width: '100%' }} type='password' name='password' value={json.password} onChange={handleChange} placeholder='Password' />
            </Grid>
            <FlexBox justifyContent="space-between">
                <FlexBox gap={1}>
                    <Checkbox
                        size="small"
                        name="remember"
                        onChange={() => setRemember(!remember)}
                        checked={!remember}
                        sx={{ padding: 0 }}
                    />

                    <Paragraph>Remember Me</Paragraph>
                </FlexBox>

                <NavLink
                    to="/session/forgot-password"
                    style={{ color: '#BC09C7', fontSize: '12px' }}
                >
                    Forgot password?
                </NavLink>
            </FlexBox>

            <LoadingButton
                type="submit"
                onClick={handleSubmit}
                loading={loading}
                variant="contained"
                sx={{ my: 2, backgroundColor: '#BC09C7', width: '100%', border: '2px solid #BC09C7', '&:hover': { backgroundColor: 'white', color: '#BC09C7', border: '2px solid #BC09C75' } }}
            >
                Login
            </LoadingButton>

            <Paragraph>
                Don't have an account?
                <NavLink
                    to="/signup"
                    style={{ marginLeft: 5 }}
                >
                    Register
                </NavLink>
            </Paragraph>
        </>
    )
}

export default LoginForm