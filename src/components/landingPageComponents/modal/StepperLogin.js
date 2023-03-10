import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalOneContent from './ModalOneContent';
import { useContext } from 'react';
import { offerContext } from '../../../offerContext';
import ModalTwoContent from './ModalTwoContent';
import ModalThreeContent from './ModalThreeContent';
import { useNavigate } from 'react-router';

const steps = ['Connect your wallet', 'Add your email', 'Complete your profile'];

export default function HorizontalLinearStepper({ open, setOpen }) {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const { user, setUser, account, setAccount } = useContext(offerContext)
    const isStepOptional = (step) => {
        return step === 2;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        setOpen(false)
        navigate('/')
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
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
            <React.Fragment>
                {
                    activeStep === 0 ? <ModalOneContent setActiveStep={setActiveStep} activeStep={activeStep} /> : activeStep === 1 ? <ModalTwoContent setActiveStep={setActiveStep} activeStep={activeStep} /> : <ModalThreeContent />
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    {
                        activeStep ? <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={() => {
                                localStorage.clear();
                                setUser({});
                                setAccount('')
                                setActiveStep(0);
                            }}
                            sx={{ mr: 1 }}
                        >
                            Disconnect wallet
                        </Button> : ""
                    }

                    <Button onClick={handleSkip}>
                        {activeStep === 0 && 'Back'}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            Skip
                        </Button>
                    )}


                    <Button onClick={() => navigate('/createprofile')}>
                        {activeStep === steps.length - 1 ? 'Complete Your Profile' : ''}
                    </Button>
                </Box>
            </React.Fragment>

        </Box>
    );
}
