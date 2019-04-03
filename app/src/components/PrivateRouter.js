import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, name, header, headerItems, createPath, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component 
                {...props} 
                header={header}
                headerItems={headerItems}
                createPath={createPath}
                name={name}
            />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)