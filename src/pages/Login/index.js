import React from "react"
import { Form, Input, Button, Checkbox, Row, Col, Card } from "antd"
import { Redirect } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import config from "../../constants/config"
import { AppContext } from "../../context"

const Login = (props) => {
	const context = React.useContext(AppContext)

	const handleSubmit = (e) => {
		e.preventDefault()

		props.form.validateFields((err, values) => {
			if (!err) {
				// authAPI.loginWithEmail({ email: values.username, password: values.password }).then(res => {
				//     axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
				//     if (values.remember) {
				//         window.localStorage.setItem('@user/token', res.data.token)
				//     }
				//     context.set(p => ({ ...p, isAuth: true, user: res.data.user }))
				// })
				context.set((p) => ({ ...p, isAuth: true, user: {} }))
				console.log("Received values of form: ", values)
			}
		})
	}

	if (context.isAuth) {
		return <Redirect to={"/"} />
	}

	return (
		<div style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1,height:"100vh"}}>
			<Col md={6}>
			<Card>
				<Form onSubmit={handleSubmit} className="login-form">
					<div style={{ marginTop: 50, marginBottom: 30 }}>
						<img
							alt="logo"
							className="login-logo"
							src={config.logo}
						/>
						<span className="login-title">{config.name}</span>
					</div>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Username"
						/>
					</Form.Item>
					<Form.Item>
						<Input
							prefix={<LockOutlined />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						{/* <a className="login-form-forgot" href="">
					Forgot password
				</a> */}
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</Card>
			</Col>
		</div>
	)
}

export default Login
