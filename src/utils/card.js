import React from 'react';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, makeStyles, Grid  } from '@material-ui/core';
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
        fontFamily: bold
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
        saved
    } = props;
    const classes = useStyles();
    return (
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                classes={{
                    title: classes.title,
                    subheader: classes.subheader
                }}
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=960,872"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" className={classes.description} color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
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