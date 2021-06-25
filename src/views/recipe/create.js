import React from 'react';
import { BoldText } from '../../utils/text';
import { Paper, Divider, makeStyles, Grid } from '@material-ui/core';
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
    const [method, setMethod] = React.useState([
        {
          method: ''
        }
      ]);
    const addMethod = ()=>{
      setMethod([...method, {method: ''}])
    }
    const handleMethod = (index, e)=>{
        const values = [...method];
        values[index] = e.target.value;
        setMethod(values)
    }
    return (
        <div>
            <Grid container justify="space-between">
                <BoldText style={{alignSelf: 'center'}}>Create Recipe</BoldText>
                <ContainedButton variant="contained">Save</ContainedButton>
            </Grid>
            <Paper className={classes.root}>
                <ImageUpload icon={<PhotoCamera />} text="Upload photos" uploadFile={(e) => uploadFile(e)}/>
            <Divider />
                <VideoUpload icon={<VideocamIcon />} text="Upload videos" uploadFile={(e) => uploadFile(e)} />
                <TextInput labelName="Enter Recipe Name" style={{margin: 0, marginRight: 20}} labelWidth={145} />
                <TextInput labelName="Enter Recipe Description" multiline style={{margin: 0, marginRight: 20}} labelWidth={190} />
                <BoldText style={{marginLeft: 10}}>Servings</BoldText>
                <Counter step={step} setStep={setStep} />
                <TextInput labelName="Cook Time" style={{margin: 0, width: 200}} placeholder="1 hr 30 mins" labelWidth={82}/>
                <BoldText style={{marginLeft: 10}}>Ingredients</BoldText>
                <ContainedButton variant="contained" style={{margin: 10}}>Add Ingredients</ContainedButton>
                <BoldText style={{marginLeft: 10}}>Preparation</BoldText>
            {method.map((data,index)=>(
                <div key={index}>
                    <TextInput
                        labelName={"Method " + (index + 1)} 
                        onChange={(e)=> handleMethod(index, e)}
                        style={{margin: 0, marginRight: 20}}
                    />
                    <Grid container>
                        <Grid item xs={2} style={{marginLeft: 10}}>
                            <ImageUpload icon={<PhotoCamera />} uploadFile={(e) => uploadFile(e)}/>
                        </Grid>
                    </Grid>
                </div>
                ))}
                <ContainedButton variant="contained" style={{margin: 10}} onClick={addMethod}>Add Method</ContainedButton>
            </Paper>
        </div>
    )
}

export default CreateRecipe;