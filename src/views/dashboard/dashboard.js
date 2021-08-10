import React from 'react';
import { Grid, Backdrop, CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { RecipeCard } from '../../utils/card';
import { BoldText } from '../../utils/text';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GET_RECIPE, PUBLISH_RECIPE, RECIPE_BY_ID } from '../../api';
import { primary } from '../../constants/Colors';
import { Alert } from '@material-ui/lab'; 
import { OutlinedButton } from '../../utils/button';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: primary,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const state = history.location.state;
    const [published, setPublished] = React.useState([]);
    const [saved, setSaved] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if(state) {
            getRecipes();
        }
        else {
            getRecipes();
        }
    }, [state]);
    const getRecipes = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.get(GET_RECIPE, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        }).then((res) => {
            setPublished(res.data.publishedRecipe);
            setSaved(res.data.savedRecipe);
        }).finally(() => setLoading(false));
    };
    const handlePublishRecipe = (id) => {
        setLoading(true);
        axios.get(PUBLISH_RECIPE(id)).then((res) => {
            setOpen(true);
            getRecipes();
        });
    };
    const handleDelete = (id) => {
        setLoading(true);
        axios.delete(RECIPE_BY_ID(id)).then((res) => {
            getRecipes();
        });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setLoading(false);
        setOpen(false);
      };
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} bodyStyle={{backgroundColor: primary}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                   Recipe Published
                </Alert>
            </Snackbar>
            {loading ? <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop> : 
            <div>
            {published?.length > 0 && <BoldText>Published Recipes</BoldText>}
            <Grid container>
                {published?.map((publish) => (
                    <Grid xs={12} sm={6} md={4} item key={publish._id}>
                        <Link style={{textDecoration: 'none'}} to={`/recipe/${publish._id}`}>
                            <RecipeCard recipe={publish} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            {saved?.length > 0 && <BoldText>Saved Recipes</BoldText>}
            <Grid container>
                {saved?.map((save) => (
                    <Grid xs={12} sm={6} md={4} item key={save._id}>
                        <Link style={{textDecoration: 'none'}} to={`/recipe/${save._id}`}>
                            <RecipeCard recipe={save} onClick={() => handlePublishRecipe(save._id)} />
                        </Link>
                        <Grid container justify="center" style={{marginBottom: 10}}>
                            <OutlinedButton variant="outlined" onClick={() => handlePublishRecipe(save._id)}>Publish</OutlinedButton>
                        </Grid>
                        <Grid container justify="center" style={{marginBottom: 10}}>
                            <OutlinedButton variant="outlined" onClick={() => handleDelete(save._id)}>Delete</OutlinedButton>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            </div>
            }
        </div>
    )
}

export default Dashboard;