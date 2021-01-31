import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import RouteWithLayout from "./RouteWithLayout"
import { AppContext } from "../context"
import MainLayout from "../layouts/Main"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import BrandPage from "../pages/Brand"
import Product from "../pages/Product"
import { getAuthLocal } from "../utils/helper"
import User from "../pages/Users"
import Orders from "../pages/Orders"
import Setting from "../pages/Setting"
import Admins from "../pages/Admins"
import UserInfo from "../pages/UserInfo"

const RootRouter = () => {
	const context = React.useContext(AppContext)

	useEffect(() => {
		let token = getAuthLocal()
		if (token) {
			context.set((p) => ({ ...p, isAuth: true, user: {} }))
		} else {
			context.set((p) => ({ ...p, isAuth: false, user: {} }))
		}
	}, [])

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
						path="/product"
						layout={MainLayout}
						component={Product}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/setting"
						layout={MainLayout}
						component={Setting}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/orders"
						layout={MainLayout}
						component={Orders}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/admins"
						layout={MainLayout}
						component={Admins}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/users"
						layout={MainLayout}
						component={User}
						isAuth={context.isAuth}
					/>
					<RouteWithLayout
						path="/user-info"
						layout={MainLayout}
						component={UserInfo}
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
