import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import RouteWithLayout from "./RouteWithLayout"
import { AppContext } from "../context"
import MainLayout from "../layouts/Main"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import BrandPage from "../pages/Brand"

const RootRouter = () => {
	const context = React.useContext(AppContext)

	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/login" component={Login} />
					<RouteWithLayout
						path="/users"
						layout={MainLayout}
						component={Users}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout 
						path="/brand"
						layout={MainLayout}
						component={BrandPage}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/"
						layout={MainLayout}
						component={Dashboard}
						isAuth={context.isAuth}
					/>				
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default RootRouter
