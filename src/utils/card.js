import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, makeStyles, Grid  } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { grey } from '../constants/Colors';
import { bold } from '../constants/Font';
import { OutlinedButton } from './button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        backgroundColor: theme.palette.background,
        '&:hover': {
            backgroundColor: grey,
            cursor: 'pointer'
        },
    },
    avatar: {
        backgroundColor: orange[500],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontFamily: bold,
        fontSize: 20
    },
    subheader: {
        fontFamily: bold
    },
    description: {
        fontFamily: bold
    }
}));

export const RecipeCard = (props) => {
    const {
        saved,
        recipe
    } = props;
    const classes = useStyles();
    return (
            <Card className={classes.root}>
            <CardHeader
                classes={{
                    title: classes.title,
                    subheader: classes.subheader
                }}
                title={recipe.title}
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image={recipe.recipeImage[0].url}
                title={recipe.title}
            />
            <CardContent>
                <Typography variant="body2" className={classes.description} color="textSecondary" component="p">
                    {recipe.description}
                </Typography>
            </CardContent>
            {saved && 
                <Grid container justify="center" style={{marginBottom: 10}}>
                    <OutlinedButton variant="outlined">Publish</OutlinedButton>
                </Grid>
            }
            </Card>
    )
}