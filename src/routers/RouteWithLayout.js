import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteWithLayout = ({ layout: Layout, component: Component, isAuth, ...rest }) => {

    if (!isAuth) {
        return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />
    }

    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    )
}

RouteWithLayout.propTypes = {
    component: PropTypes.func.isRequired,
    layout: PropTypes.func.isRequired,
    path: PropTypes.string,
}


export default RouteWithLayout;
