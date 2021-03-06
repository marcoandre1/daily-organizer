/**
 * The navigation component is present on all non-login pages,
 * and contains a link back to the dashboard, and the user's name.
 */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => (
    <div className="header">
        <Link to={`${REPO}/dashboard`}>
            <h1>
                Daily Organizer
            </h1>
        </Link>
    </div>
);

export const ConnectedNavigation = connect(state=>state)(Navigation);
