import { TextField, Checkbox, CardMedia } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from '../app/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import user from '../../images/user.png'

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

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
    const handleFormSubmit = () => {

    }

    return (
        <>
            <CardMedia component='img' image={user} sx={{ width: '40%' }} />
            <h4 style={{ color: '#3F454F' }}>Hi, Welcome Back!</h4>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            size="small"
                            type="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            helperText={touched.email && errors.email}
                            error={Boolean(errors.email && touched.email)}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={handleChange}
                            helperText={touched.password && errors.password}
                            error={Boolean(errors.password && touched.password)}
                            sx={{ mb: 1.5 }}
                        />

                        <FlexBox justifyContent="space-between">
                            <FlexBox gap={1}>
                                <Checkbox
                                    size="small"
                                    name="remember"
                                    onChange={handleChange}
                                    checked={values.remember}
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
                    </form>
                )}
            </Formik>
        </>
    )
}

export default LoginForm