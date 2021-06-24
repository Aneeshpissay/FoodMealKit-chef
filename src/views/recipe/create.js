import React from 'react';
import { BoldText } from '../../utils/text';
import { Paper, Divider, makeStyles } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import { ImageUpload, VideoUpload } from '../../utils/upload';
import { TextInput } from '../../utils/textInput';
import { Counter } from '../../utils/counter';
import { ContainedButton } from '../../utils/button';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20
    }
}));

const CreateRecipe = () => {
    const classes = useStyles();
    const uploadFile = (event) => {
        console.log(event.target.files)
    }
    const [step, setStep] = React.useState(2);
    return (
        <div>
            <BoldText>Create Recipe</BoldText>
            <Paper className={classes.root}>
                <ImageUpload icon={<PhotoCamera />} text="Upload photos" uploadFile={(e) => uploadFile(e)}/>
            <Divider />
                <VideoUpload icon={<VideocamIcon />} text="Upload videos" uploadFile={(e) => uploadFile(e)} />
                <TextInput labelName="Enter Recipe Name" style={{margin: 0}} />
                <TextInput labelName="Enter Recipe Description" multiline style={{margin: 0}} />
                <BoldText style={{marginLeft: 10}}>Servings</BoldText>
                <Counter step={step} setStep={setStep} />
                <TextInput labelName="Cook Time" style={{margin: 0, width: 200}} placeholder="1 hr 30 mins" />
                <BoldText style={{marginLeft: 10}}>Ingredients</BoldText>
                <ContainedButton variant="contained" style={{margin: 10}}>Add Ingredients</ContainedButton>
                <BoldText style={{marginLeft: 10}}>Preparation</BoldText>
            </Paper>
        </div>
    )
}

export default CreateRecipe;