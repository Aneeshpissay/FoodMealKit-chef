import { Grid, Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { RecipeCard } from '../../utils/card';
import { BoldText } from '../../utils/text';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GET_RECIPE } from '../../api';
import { primary } from '../../constants/Colors';

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
        axios.get(GET_RECIPE).then((res) => {
            setPublished(res.data.publishedRecipe);
            setSaved(res.data.savedRecipe);
        }).finally(() => setLoading(false));
    };
    return (
        <div>
            {loading ? <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop> : 
            <div>
            {published?.length > 0 && <BoldText>Published Recipes</BoldText>}
            <Grid container>
                {published.map((publish) => (
                    <Grid xs={12} sm={6} md={4} item>
                        <Link style={{textDecoration: 'none'}} to={`/recipe/${publish._id}`}>
                            <RecipeCard recipe={publish} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <BoldText>Saved Recipes</BoldText>
            <Grid container>
                {saved.map((save) => (
                    <Grid xs={12} sm={6} md={4} item>
                        <Link style={{textDecoration: 'none'}} to={`/recipe/${save._id}`}>
                            <RecipeCard recipe={save} saved />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            </div>
            }
        </div>
    )
}

export default Dashboard;