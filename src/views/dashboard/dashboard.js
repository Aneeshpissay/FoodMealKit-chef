import { Grid } from '@material-ui/core';
import React from 'react';
import { RecipeCard } from '../../utils/card';
import { BoldText } from '../../utils/text';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    return (
        <div>
            <BoldText>Published Recipes</BoldText>
            <Grid container>
                <Grid xs={12} sm={6} md={4} item>
                    <Link style={{textDecoration: 'none'}} to="/recipe/1">
                        <RecipeCard/>
                    </Link>
                </Grid>
                <Grid xs={12} sm={6} md={4}item>
                    <RecipeCard />
                </Grid>
                <Grid xs={12} sm={6} md={4}item>
                    <RecipeCard />
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard />
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard />
                </Grid>
            </Grid>
            <BoldText>Saved Recipes</BoldText>
            <Grid container>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard saved/>
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard saved/>
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard saved/>
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard saved/>
                </Grid>
                <Grid xs={12} sm={6} md={4} item>
                    <RecipeCard saved/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;