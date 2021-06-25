import React from 'react';
import { grey, primary } from "../constants/Colors"
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import { BoldText } from '../utils/text';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
    button: {
        color: primary
    }
}));

export const ImageUpload = (props) => {
    const {
        uploadFile,
        text,
        id
    } = props;
    const classes = useStyles();
    return (
        <div style={{padding: 50, backgroundColor: grey}}>
        <input accept="image/*" className={classes.input} id={id} type="file" multiple onChange={uploadFile} />
        <label htmlFor={id}>
                <Grid container justify="center">
                    <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera />
                    </IconButton>
                    <BoldText style={{color: primary, alignSelf: 'center'}}>{text}</BoldText>
                </Grid>
        </label>
        </div>
    )
}

export const VideoUpload = (props) => {
    const {
        uploadFile,
        text
        } = props;
    const classes = useStyles();
    return (
        <div style={{padding: 50, backgroundColor: grey}}>
        <input accept="video/*" className={classes.input} id="video" type="file" onChange={uploadFile} />
        <label htmlFor="video">
                <Grid container justify="center">
                    <IconButton color="primary" className={classes.button} component="span">
                        <VideocamIcon />
                    </IconButton>
                    <BoldText style={{color: primary, alignSelf: 'center'}}>{text}</BoldText>
                </Grid>
        </label>
        </div>
    )
}