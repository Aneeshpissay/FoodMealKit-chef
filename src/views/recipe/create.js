import React from 'react';
import { BoldText } from '../../utils/text';
import { Paper, Divider, makeStyles, Grid } from '@material-ui/core';
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
    const [images, setImages] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const uploadImages = (event) => {
        setImages(event.target.files)
    }
    const uploadVideo = (event) => {
        setVideo(event.target.files)
    }
    const [step, setStep] = React.useState(2);
    const [method, setMethod] = React.useState([
        {
          method: '',
          stepImage: []
        }
    ]);
    const addMethod = ()=>{
      setMethod([...method, {method: '', stepImage: [] }])
    }
    const handleMethod = async (index, e)=>{
        const values = [...method];
        const myFn = (files) => {
			return new Promise((resolve, reject) => {
				const imageDataArray = [];
				for (let index = 0; index < files.length; index++) {
					const image = files[index];
					const reader = new FileReader();
					reader.onloadend = function (ev) {
						imageDataArray.push(ev.target.result);
						if (index === files.length - 1) {
							resolve(imageDataArray);
						}
					};
					reader.readAsDataURL(image);
				}
			});
		};
        let imageData = [];
        if(e.target.files && e.target.files[0].type.includes('image')) {
            imageData = await myFn(e.target.files);
        }
        values[index] = {method: imageData.length > 0 ? method[index].method : e.target.value, stepImage: [...method[index].stepImage, ...imageData]};
        setMethod(values)
    }
    return (
        <div>
            <Grid container justify="space-between">
                <BoldText style={{alignSelf: 'center'}}>Create Recipe</BoldText>
                <ContainedButton variant="contained">Save</ContainedButton>
            </Grid>
            <Paper className={classes.root}>
                <ImageUpload text="Upload photos" id="image" uploadFile={(e) => uploadImages(e)}/>
            <Divider />
                <VideoUpload text="Upload videos" uploadFile={(e) => uploadVideo(e)} />
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
                    <Grid container style={{marginLeft: 10}}>
                        {data.stepImage.map((stepImage, i) => (
                            <Grid item xs={2} key={i}>
                                <img src={stepImage} key={i} alt={i} width={150} /> 
                            </Grid>
                        ))}
                        <ImageUpload id={`stepImage-${index}`} uploadFile={(e) => handleMethod(index, e)} />
                    </Grid>
                </div>
                ))}
                <ContainedButton variant="contained" style={{margin: 10}} onClick={addMethod}>Add Method</ContainedButton>
            </Paper>
        </div>
    )
}

export default CreateRecipe;