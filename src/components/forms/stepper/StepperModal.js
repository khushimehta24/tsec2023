import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalOneContent from './ModalOneContent';
import ModalTwoContent from './ModalTwoContent';
import ModalThreeContent from './ModalThreeContent';
import { useNavigate } from 'react-router';
import { Paragraph } from '../../app/Typography';
import { NavLink } from 'react-router-dom';

const steps = ["Contact Details", 'Setup your profile', 'Verify Your Details'];

export default function HorizontalLinearStepper({ open, setOpen }) {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const isStepOptional = (step) => {
        return step === 2;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleSkip = () => {
        setOpen(false)
        navigate('/')
    };

    const [json, setJson] = useState({
        "name": "",
        "email": "",
        "phone": '',
        "password": "",
        "gender": "",
        "age": '',
    })
    console.log(json);


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {
                    activeStep === 0 ? <ModalOneContent setActiveStep={setActiveStep} activeStep={activeStep} json={json} setJson={setJson} /> : activeStep === 1 ? <ModalTwoContent setActiveStep={setActiveStep} activeStep={activeStep} json={json} setJson={setJson} /> : <ModalThreeContent setActiveStep={setActiveStep} activeStep={activeStep} json={json} setJson={setJson} />
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    {activeStep === 0 || activeStep === 1 && <Button onClick={() => setActiveStep(0)}>
                        Back
                    </Button>}
                    <Box sx={{ flex: '1 1 auto' }} />


                    {activeStep === 0 ? <Button onClick={() => setActiveStep(1)}>
                        Next
                    </Button> : ''}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paragraph>
                        Already have an account?
                        <NavLink
                            to="/login"
                            style={{ marginLeft: 5 }}
                        >
                            Login
                        </NavLink>
                    </Paragraph>
                </Box>
            </>
        </Box>
    );
}
