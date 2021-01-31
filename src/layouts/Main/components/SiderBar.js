import React from "react"
import { Layout, Menu } from "antd"
import { Link, withRouter } from "react-router-dom"
import config from "../../../constants/config"
import { PieChartOutlined, UserOutlined } from "@ant-design/icons"

const { Sider } = Layout

const menus = [
	{ key: "1", name: "Dashboard", to: "/", icon: <PieChartOutlined /> },
	{ key: "2", name: "Users", to: "/users", icon: <UserOutlined /> },
]

const SiderBar = (props) => {
	const currentPath = props.location.pathname
	const selected = menus.reduce((p, c) => {
		p = currentPath.indexOf(c.to) !== -1 ? c.key : p
		return p
	}, "1")

	return (
		<Sider
			trigger={null}
			collapsible
			collapsed={props.isCollapsed}
			breakpoint="lg"
			width={256}
			collapsedWidth="80"
			onCollapse={props.onCollapse}
		>
			<div className="sider-bar-logo" id="logo">
				<Link to="/">
					<img src={config.logo} alt="logo" />
					<h1>{config.name}</h1>
				</Link>
			</div>
			<Menu defaultSelectedKeys={[selected]} theme="dark">
				{menus.map((menu) => (
					<Menu.Item key={menu.key}>
						{menu.icon}
						<span>{menu.name}</span>
						<Link to={menu.to} />
					</Menu.Item>
				))}
			</Menu>
		</Sider>
	)
}

export default withRouter(SiderBar)
