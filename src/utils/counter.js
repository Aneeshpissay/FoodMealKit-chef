import { Grid, IconButton } from '@material-ui/core';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import React from 'react';
import { BoldText } from './text';

export const Counter = (props) => {
    const {
        step,
        setStep
    } = props;
    return(
        <Grid container>
            <IconButton onClick={() => setStep(step - 2)} disabled={step === 2}>
                <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <BoldText style={{alignSelf: 'center'}}>{step}</BoldText>
            <IconButton onClick={() => setStep(step + 2)} disabled={step === 12}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
        </Grid>
    )
}

