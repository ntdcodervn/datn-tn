import React from "react"
import { Layout } from "antd"
import SiderBar from "./components/SiderBar"
import Header from "./components/Header"
import config from "../../constants/config"
const { Footer, Content } = Layout

const MainLayout = (props) => {
	const [value, setValue] = React.useState({
		collapsed: false,
	})

	const onToggle = () => {
		setValue({ ...value, collapsed: !value.collapsed })
	}
	const onCollapse = (collapsed) => {
		setValue({ ...value, collapsed })
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<SiderBar isCollapsed={value.collapsed} onCollapse={onCollapse} />
			<Layout>
				<Header isCollapsed={value.collapsed} onToggle={onToggle} />
				<Content style={{ margin: 24 }}>{props.children}</Content>
				<Footer>{config.copyright}</Footer>
			</Layout>
		</Layout>
	)
}

export default MainLayout
