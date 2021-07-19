import React from 'react';
import Login from './auth/login';
import Header from './header/header';
import Dashboard from './dashboard/dashboard';
import View from './recipe/view';
import CreateRecipe from './recipe/create';
import Orders from './orders/orders';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';

const Main = () => {
    const token = localStorage.getItem('token');
    return(
        <BrowserRouter>
            {token ? 
            <Header>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/dashboard" render={props => <Dashboard {...props} />} />
                <Route exact path="/recipe/:id" render={props => <View {...props} />} />
                <Route exact path="/create-recipe" render={props => <CreateRecipe {...props} />} />
                <Route exact path="/orders" render={props => <Orders {...props} />} />
            </Switch>
            </Header> : 
            <Switch>
                <Route exact path="/">
                    <Redirect to='/login' />
                </Route>
                <Route exact path="/login" render={props => <Login {...props} />} />
            </Switch>}
        </BrowserRouter>
    )
}


export default Main;