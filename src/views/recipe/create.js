import React from 'react';
import { BoldText } from '../../utils/text';
import { Paper, Divider, makeStyles, Grid, IconButton } from '@material-ui/core';
import { ImageUpload, VideoUpload } from '../../utils/upload';
import { TextInput } from '../../utils/textInput';
import { Counter } from '../../utils/counter';
import { ContainedButton } from '../../utils/button';
import { Ingredients } from './ingredients';
import axios from 'axios';
import { ALL_INGREDIENTS } from '../../api';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20
    }
}));

const CreateRecipe = () => {
    const classes = useStyles();
    const [images, setImages] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const uploadImages = async (e) => {
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
        setImages([...images, ...imageData])
    }
    const removeImage = (data) => {
		let deleteImage = [];
		deleteImage = images.filter((image) => image !== data);
		setImages(deleteImage);
	};
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
    const [data, setData] = React.useState([]);
    const [ingredientsData, setIngredientsData] = React.useState([]);
    React.useEffect(() => {
        axios.get(ALL_INGREDIENTS).then((res) => {
            setData(res.data);
        })
    }, []);
    const [recipeName, setRecipeName] = React.useState('');
    const [recipeDescription, setRecipeDescription] = React.useState('');
    const [cookTime, setCookTime] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const saveRecipe = () => {
        const data = {
            images: images,
            video: video,
            recipeName: recipeName,
            recipeDescription: recipeDescription,
            servings: step,
            cookTime: cookTime,
            ingredients: ingredientsData,
            preparation: method,
            price: price
        }
        console.log(data);
    }
    return (
        <div>
            <Grid container justify="space-between">
                <BoldText style={{alignSelf: 'center'}}>Create Recipe</BoldText>
                <ContainedButton variant="contained" onClick={saveRecipe}>Save</ContainedButton>
            </Grid>
            <Paper className={classes.root}>
                <ImageUpload text="Upload photos" id="image" uploadFile={(e) => uploadImages(e)}/>
                <Grid container style={{marginLeft: 10}}>
                    {images.map((image, i) => (
                        <Grid item xs={2} key={i}>
                            <Grid container justify="flex-end">
                                <IconButton aria-label="delete" onClick={() => removeImage(image)}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                            <img src={image} key={i} alt={i} width={150} style={{margin: 10}} /> 
                        </Grid>
                    ))}
                </Grid>
            <Divider />
                <VideoUpload text="Upload videos" uploadFile={(e) => uploadVideo(e)} />
                <TextInput onChange={(e) => setRecipeName(e.target.value)} labelName="Enter Recipe Name" style={{margin: 0, marginRight: 20}} labelWidth={145} />
                <TextInput onChange={(e) => setRecipeDescription(e.target.value)} labelName="Enter Recipe Description" multiline style={{margin: 0, marginRight: 20}} labelWidth={190} />
                <BoldText style={{marginLeft: 10}}>Servings</BoldText>
                <Counter step={step} setStep={setStep} />
                <TextInput onChange={(e) => setCookTime(e.target.value)} labelName="Cook Time" style={{margin: 0, width: 200}} placeholder="1 hr 30 mins" labelWidth={82}/>
                <Ingredients data={data} ingredientsData={ingredientsData} setIngredientsData={setIngredientsData} />
                <TextInput onChange={(e) => setPrice(e.target.value)} type="number" labelName="Meal Kit Price" style={{margin: 0, width: 200}} labelWidth={105}/>
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