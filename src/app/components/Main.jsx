import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from "./Dashboard";

const Main = () => {
    return (
        <Provider store={store}>
            <div className="container mt-3">
                <ConnectedDashboard/>
            </div>
        </Provider>
    );
};

export default Main;
