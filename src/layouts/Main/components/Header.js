import React from "react"
import { Layout, Dropdown, Menu, Avatar, Button } from "antd"
import {
	UserOutlined,
	SettingOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	LoginOutlined,
} from "@ant-design/icons"

// import { Link } from 'react-router-dom';
// import config from '../../../constants/config';

const Header = ({ isCollapsed, onToggle }) => {
	const onMenuClick = (i) => {
		if (i.key === "logout") {
			// context.logout()
		}
	}

	return (
		<Layout.Header className="header">
			<Button onClick={onToggle} style={{ border: "unset" }}>
				{!isCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
			</Button>
			<div className="header-right">
				<Dropdown
					overlay={
						<Menu selectedKeys={[]} onClick={onMenuClick}>
							<Menu.Item key="userCenter">
								<UserOutlined />
								<span>Account Center</span>
							</Menu.Item>
							<Menu.Item key="userinfo">
								<SettingOutlined />
								<span>Account Settings</span>
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item key="logout">
								<LoginOutlined />
								<span>Logout</span>
							</Menu.Item>
						</Menu>
					}
				>
					<span className="header-item">
						<Avatar
							size="small"
							style={{ margin: "20px 8px 20px 0" }}
							src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
						/>
						<span>{"Admin"}</span>
					</span>
				</Dropdown>
			</div>
		</Layout.Header>
	)
}

export default Header
