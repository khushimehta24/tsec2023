import { Button, CardMedia, Grid, Tooltip, Typography, Radio, FormControlLabel, RadioGroup, Checkbox, FormGroup, Divider } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import errorHandler from '../../../helpers/errorHandler';
import { offerContext } from '../../../offerContext'
import { isMobile } from "react-device-detect";
import QuestionnaireServices from '../../../services/QuestionnaireServices'

const style = {
    btn: { display: 'flex', padding: { md: '5px', xs: '0px' }, width: '100%', cursor: 'pointer', borderRadius: '10px', backgroundColor: '#f2f2f2', height: '100%', flexDirection: 'column', alignItems: 'center', textTransform: 'none' },
    img: { width: '50px' },
    heading: { fontFamily: 'Poppins', margin: 0, padding: 0, fontWeight: 'bold', color: 'black' },
    ptag: { margin: 0, padding: 0, fontSize: '10px', color: '#4e4e4e' },
    gridItem: { padding: { md: '10px', xs: '5px' }, height: { md: '100%', xs: 'auto' } },
    gridContainer: { margin: '5% 0', maxHeight: '50vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } },
}

function ModalOneContent({ activeStep, setActiveStep }) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        const func = async () => {
            await QuestionnaireServices.getQuestions()
                .then((res) => {
                    console.log(res.data)
                    setQuestions(res.data)
                })
        }
        func()
    }, [])


    // console.log(user, account, "modalonek")

    return (
        <>

        </>
    )
}

export default ModalOneContent