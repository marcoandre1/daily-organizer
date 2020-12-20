import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from "./Dashboard";
import { BrowserRouter, Route, } from 'react-router-dom';
import { ConnectedNavigation } from './Navigation';

const Main = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="container mt-3">
                    <ConnectedNavigation/>
                    <Route
                        exact
                        path="/dashboard"
                        render={ () => (<ConnectedDashboard/>)}
                    />
                </div>
            </Provider>
        </BrowserRouter>
    );
};

export default Main;
