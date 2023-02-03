import React from 'react';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { offerContext } from '../../../offerContext';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { storage } from '../../../firebase/config'
import { v4 as uuidv4 } from 'uuid';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import AuthServices from '../../../services/AuthServices';
import { useNavigate } from 'react-router';
import successHandler from '../../../helpers/successHandler';
import errorHandler from '../../../helpers/errorHandler';



function ModalTwoContent({ setActiveStep, activeStep, json, setJson }) {
    const [loading, setLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState('');
    const [load, setLoad] = useState(false)
    const { user, setUser, token, setToken } = useContext(offerContext)
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }
    const [gender, setGender] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setLoading(true)
        var FormData = require('form-data');
        var data = new FormData();
        data.append("name", json.name);
        data.append("email", json.email)
        data.append("phone", json.phone)
        data.append("password", json.password)
        data.append("gender", json.gender)
        data.append("age", json.age)
        data.append('profilePic', imageUpload)
        console.log(data)
        await AuthServices.signup(data)
            .then((res) => {
                console.log(res);
                setUser(res.data.data.user)
                setToken(res.data.data.token)
                localStorage.setItem("ccpUser", JSON.stringify(res.data.data.user))
                localStorage.setItem("ccpToken", res.data.data.token)
                setLoading(false)
                successHandler('Singed up successfully')
                setActiveStep(2)
            }).catch((e) => {
                console.log(e)
                errorHandler(e.response.data.message)
            })
    }


    return (
        <Grid container spacing={2} sx={{ padding: '2% 0' }}>
            <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                <Grid sx={{ width: '100%' }}>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Password</p>
                    <TextField sx={{ width: '100%' }} type='password' name='password' value={json.password} onChange={handleChange} placeholder='Password' />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Age</p>
                    <TextField sx={{ width: '100%' }} name='age' value={json.age} onChange={handleChange} placeholder='age' />
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Gender</p>
                    <Select
                        id="demo-simple-select"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value)
                            setJson({
                                ...json, 'gender': e.target.value
                            })
                        }}
                        sx={{ width: '100%' }}
                    >
                        {
                            ['female', 'male', 'others'].map((item, key) => (
                                <MenuItem key={key} value={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                    <p style={{ fontSize: '12px', marginTop: '3%' }}>Profile Photo</p>
                    <Grid>
                        <TextField sx={{ width: '100%' }} type='file' name='profilePic' onChange={(event) => {
                            console.log(event.target.files[0])
                            setImageUpload(event.target.files[0])
                        }} placeholder='profilePic' />
                    </Grid>
                    <LoadingButton
                        type="submit"
                        onClick={handleSubmit}
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2, backgroundColor: '#BC09C7', width: '100%', border: '2px solid #BC09C7', '&:hover': { backgroundColor: 'white', color: '#BC09C7', border: '2px solid #BC09C75' } }}
                    >
                        Signup
                    </LoadingButton>
                </Grid>
            </Grid >
        </Grid>
    )
}

export default ModalTwoContent