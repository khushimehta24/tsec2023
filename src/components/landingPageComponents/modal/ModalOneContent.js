import { Button, CardMedia, Grid, Tooltip, Typography, Radio, FormControlLabel, RadioGroup } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import axiosHandler from '../../../helpers/axiosHandler'
import { offerContext } from '../../../offerContext'
import { isMobile } from "react-device-detect";
import QuestionnaireServices from '../../../services/QuestionnaireServices'

const style = {
    btn: { display: 'flex', padding: { md: '5px', xs: '0px' }, width: '100%', cursor: 'pointer', borderRadius: '10px', backgroundColor: '#f2f2f2', height: '100%', flexDirection: 'column', alignItems: 'center', textTransform: 'none' },
    img: { width: '50px' },
    heading: { fontFamily: 'Poppins', margin: 0, padding: 0, fontWeight: 'bold', color: 'black' },
    ptag: { margin: 0, padding: 0, fontSize: '10px', color: '#4e4e4e' },
    gridItem: { padding: { md: '10px', xs: '5px' }, height: { md: '100%', xs: 'auto' } },
    gridContainer: { margin: '5% 0' },
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
            <Grid container sx={style.gridContainer}>
                <Grid item container md={12}>
                    {questions.map((question) => {
                        return <Grid item xs={12}>
                            <Typography>{question.question}</Typography>
                            <RadioGroup
                                name="radio-buttons-group"
                            >
                                {
                                    question.options.map((option) => {
                                        <FormControlLabel value={option} control={<Radio />} label={option} />

                                    })
                                }
                            </RadioGroup>

                        </Grid>
                    })}


                </Grid>
            </Grid>
        </>
    )
}

export default ModalOneContent