import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HorizontalLinearStepper from './StepperLogin';
import { Button, CardMedia, Grid, Tooltip, Typography, Radio, FormControlLabel, RadioGroup, Checkbox, FormGroup, Divider, CircularProgress } from '@mui/material'
import QuestionnaireServices from '../../../services/QuestionnaireServices';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import AuthServices from '../../../services/AuthServices';
import successHandler from '../../../helpers/successHandler';
import { offerContext } from '../../../offerContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const AddBtn = {
    color: 'white', background: '#BC09C7',
    fontFamily: 'Poppins', padding: '0px 2.6%'
}


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: 700, sm: 700, xs: 400 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style = {
    btn: { display: 'flex', padding: { md: '5px', xs: '0px' }, width: '100%', cursor: 'pointer', borderRadius: '10px', backgroundColor: '#f2f2f2', height: '100%', flexDirection: 'column', alignItems: 'center', textTransform: 'none' },
    img: { width: '50px' },
    heading: { fontFamily: 'Poppins', margin: 0, padding: 0, fontWeight: 'bold', color: 'black' },
    ptag: { margin: 0, padding: 0, fontSize: '10px', color: '#4e4e4e' },
    gridItem: { padding: { md: '10px', xs: '5px' }, height: { md: '100%', xs: 'auto' } },
    gridContainer: { margin: '5% 0', maxHeight: '50vh', overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } },
}

export default function LoginModal({ open, setOpen }) {
    // const [open, setOpen] = useState(false)

    const [dummy, setDummy] = useState([])
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [options, setOptions] = useState(null)
    const { token } = useContext(offerContext)
    const [json, setJson] = useState((Array(Number(15)).fill({
        "question": "",
        "answer": "",
        "expectedAnswers": []
    })))
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    console.log(dummy)
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log(json);
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
    const customItemRenderer = ({ item, itemIndex, methods }) => {
        console.log(item, 'item')
        return <>
            <Grid onClick={() => methods.addItem(item)} sx={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '2%' }}>
                {item[itemIndex]}
            </Grid>
        </>
    }

    const submit = async () => {
        setLoading(true)
        await AuthServices.userQuestionnaire(json, token)
            .then((res) => {
                console.log(res);
                setLoading(false)
                successHandler("Successfully submitted")
            }).catch((e) => {
                setLoading(false)

            })
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ "& .css-1m2x5u7": { border: 'none', borderRadius: '10px' } }}
            >
                <Box sx={style2}>
                    <Grid container sx={style.gridContainer}>
                        <Grid item container md={12}>
                            {questions.map((question, index) => {
                                return <Grid item key={index} xs={12} >
                                    <h4 style={{ marginTop: '5%' }}>{question.question}</h4>
                                    <p style={{ fontSize: '12px' }}>Your Answer</p>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={question.options[0]}
                                        name="radio-buttons-group"
                                        onChange={(e) => {
                                            let obj = {
                                                "question": questions[index].question,
                                                "answer": e.target.value,
                                                "expectedAnswers": [e.target.value]
                                            }
                                            let arr = json
                                            arr[index] = obj
                                            console.log(arr)
                                            setJson(arr)
                                        }}
                                    >
                                        {
                                            question.options.map((option) => {
                                                return <FormControlLabel value={option} control={<Radio size="small" />} label={option} />
                                            })
                                        }
                                    </RadioGroup>
                                    <Divider />
                                </Grid>
                            })}
                            {!loading ? <Button onClick={submit} sx={{ textTransform: 'none', height: '3.5rem', width: '100%', border: '2px solid #BC09C7', '&:hover': { border: '2px solid #BC09C7 !important', backgroundColor: 'white !important', color: '#BC09C7 !important' }, ...AddBtn }} > Submit</Button> : <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <CircularProgress sx={{ backgroundColor: '#BC09C7', color: 'white', padding: '5px', borderRadius: '50%' }} />
                            </Box>}

                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
