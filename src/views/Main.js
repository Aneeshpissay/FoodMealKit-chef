import React from 'react';
import Header from './header/header';
import Dashboard from './dashboard/dashboard';
import View from './recipe/view';
import CreateRecipe from './recipe/create';
import Orders from './orders/orders';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

const Main = () => {
    return(
        <BrowserRouter>
            <Header>
            <Switch>
                <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
                <Route exact path="/recipe/:id" render={props => <View {...props} />} />
                <Route exact path="/create-recipe" render={props => <CreateRecipe {...props} />} />
                <Route exact path="/orders" render={props => <Orders {...props} />} />
            </Switch>
            </Header>
        </BrowserRouter>
    )
}


export default Main;