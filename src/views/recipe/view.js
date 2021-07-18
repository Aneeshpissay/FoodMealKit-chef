import { Grid, Paper, Divider, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { OutlinedButton } from '../../utils/button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { BoldText, LightText, MediumText } from '../../utils/text';
import { grey, primary } from '../../constants/Colors';
import { Video } from '../../utils/video';
import StopIcon from '@material-ui/icons/Stop';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RECIPE_BY_ID } from '../../api';
import { RecipeTable } from '../../utils/recipeTable';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: primary,
    },
}));

const RecipeView = () => {
    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'measurement', label: 'Measurement' },
    ];
    const classes = useStyles();
    const params = useParams();
    const id = params?.id;
    const [recipeView, setRecipeView] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        axios.get(RECIPE_BY_ID(id)).then((res) => {
            setRecipeView(res.data)
        }).finally(() => setLoading(false));
    },[id]);
    const [watching, setWatching] = React.useState(false);
    return (
        <div>
           {loading ?  <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop> : 
        <Grid container>
            {watching ? 
                <Grid container justify="center">
                    <Video url={recipeView?.recipeVideo?.url} />
                </Grid>
            : 
            recipeView.recipeImage ? <Grid container justify="center">
            <img src={recipeView.recipeImage[0].url} width={500} height={500} alt={recipeView.title} />
        </Grid> : null}
            <Paper style={{width: '100%'}}>
                <Grid container justify="center" style={{marginTop: 10}}>
                    {recipeView.recipeVideo && <OutlinedButton variant="outlined" color="secondary" startIcon={watching ? <StopIcon /> : <PlayArrowIcon />} onClick={() => setWatching(!watching)}>
                        {watching ? 'Stop Watching' : 'Watch Video'}
                    </OutlinedButton>}
                </Grid>
                <Grid container>
                    <BoldText style={{marginLeft: 10, marginTop: 10, fontSize: 20}}>{recipeView.title}</BoldText>
                </Grid>
                <LightText style={{marginTop: 20, marginLeft: 10}}>{recipeView.description}</LightText>
                <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10}} />
                <Grid style={{marginTop: 10}}>
                <BoldText style={{marginTop: 10, marginLeft: 10, fontSize: 18}}>
                    Servings: {recipeView.servings}
                </BoldText>
                <BoldText style={{marginTop: 10, marginLeft: 10, fontSize: 18}}>
                    Cook Time: {recipeView.cookTime}
                </BoldText>
                    {recipeView?.ingredients?.length > 0 && <RecipeTable title="Ingredients" data={recipeView.ingredients} columns={columns} />}
                </Grid>
            <Divider style={{marginTop: 10, marginLeft: 10, marginRight: 10}} />
            <BoldText style={{marginTop: 10, marginLeft: 10, fontSize: 18}}>
                Preparation
            </BoldText>
            <Grid container>
            {recipeView?.preparation?.map((preparation, index) => (
                <Grid container direction="column" style={{ backgroundColor: grey, padding: 10, margin: 10}} key={index}>
                    <BoldText style={{marginBottom: 10, fontSize: 20}}>Step {index + 1}</BoldText>
                    <MediumText style={{marginBottom: 10}}>{preparation.method}</MediumText>
                    {preparation?.stepImage?.map((stepImage, index) => (
                        <img src={stepImage} key={index} alt="" width={200} height={200} />
                    ))}
                </Grid>
            ))}
            </Grid>
            </Paper>
        </Grid>
        }
        </div>
    )
};

export default RecipeView;