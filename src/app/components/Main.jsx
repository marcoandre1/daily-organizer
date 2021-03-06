import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { BrowserRouter, Route, } from 'react-router-dom';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail} from './TaskDetail';

const Main = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="container mt-3">
                    <ConnectedNavigation/>
                    <Route
                        exact
                        path={`${REPO}/dashboard`}
                        render={ () => (<ConnectedDashboard/>)}
                    />
                    <Route
                        exact
                        path={`${REPO}/task/:id`}
                        render={ ({ match }) => (<ConnectedTaskDetail match={ match }/>)}
                    />
                </div>
            </Provider>
        </BrowserRouter>
    );
};

export default Main;
