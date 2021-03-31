import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import '../App.css';
import MyBills from '../components/MyBills';
import NewBills from '../components/NewBills';
import Items from '../components/Items';
import Sales from '../components/Sales';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10px',
    border: '1px solid black'
  },
  button: {
    marginRight: theme.spacing(1),
    borderRadius: '0px',
    outline: '0 !important',
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  outlineNone: {
    outline: '0 !important'
  }
}));

function getSteps() {
  return ['Items', 'Cart', 'Bills', 'Sales'];
}

function getStepContent(step, db) {
  switch (step) {
    case 0:
      return <Items DB={db} />;
    case 1:
      return <NewBills DB={db} />;
    case 2:
      return <MyBills />;
    case 3:
      return <Sales />;
    default:
      return <p>No More Steps</p>;
  }


}

function StepperContainer(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { db } = props;

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} className={classes.outlineNone}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep, db)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button} variant="contained">
                Back
              </Button>
              {
                activeStep !== steps.length - 1 ?
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                  : null
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepperContainer;
