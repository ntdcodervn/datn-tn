import React, {useState} from "react"
import { Form, Input, Button, Checkbox, Row, Col, Card, message } from "antd"
import { Redirect } from "react-router-dom"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import config from "../../constants/config"
import { AppContext } from "../../context"
import { Formik } from "formik"
import * as yup from "yup"
import authApi from "./../../apis/auth"
import { setAuthLocal } from "../../utils/helper"

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email không được để trống")
		.email("Email sai định dạng"),
	password: yup.string().required("Passsword không được để trống"),
})

const Login = (props) => {
	const context = React.useContext(AppContext)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (values, actions) => {
		try {
			setIsLoading(true)
			let dataUser = await authApi.login(values.email, values.password)
			console.log(dataUser)
			setAuthLocal(dataUser.data.token);
			context.set((p) => ({ ...p, isAuth: true, user: {} }))
			console.log("Received values of form: ", values)
			setIsLoading(false)

		} catch (error) {
			message.error("Sai tài khoản khoặc mật khẩu")
			setIsLoading(false)
		}
	}

	if (context.isAuth) {
		return <Redirect to={"/"} />
	}

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
				height: "100vh",
			}}
		>
			<Col md={6}>
				<Card>
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={async (values, actions) => {
							handleSubmit(values, actions)
						}}
						validationSchema={validationSchema}
					>
						{({
							handleChange,
							handleSubmit,
							handleReset,
							values,
							setTouched,
							touched,
							handleBlur,
							errors,
						}) => (
							<Form className="login-form">
								<div
									style={{
										marginTop: 50,
										marginBottom: 30,
										marginRight: 20,
									}}
								>
									<img
										alt="logo"
										className="login-logo"
										src={config.logo}
									/>
									{/*
		  <span className="login-title">{config.name}</span>
	  */}
								</div>
								<Form.Item
									validateStatus={
										errors.email && touched.email ? "error" : "success"
									}
									help={errors.email && touched.email ? errors.email : null}
								>
									<Input
										prefix={<UserOutlined />}
										placeholder="Email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										name={"email"}
									/>
								</Form.Item>
								<Form.Item
									validateStatus={
										errors.password && touched.password ? "error" : "success"
									}
									help={
										errors.password && touched.password ? errors.password : null
									}
								>
									<Input
										onChange={handleChange("password")}
										prefix={<LockOutlined />}
										type="password"
										placeholder="mật khẩu"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										name={"password"}
									/>
								</Form.Item>
								<Form.Item>
									{/* <a className="login-form-forgot" href="">
	  Forgot password
  </a> */}
									<Button
										loading={isLoading}
										type="primary"
										htmlType="submit"
										className="login-form-button"
										onClick={handleSubmit}
									>
										Đăng nhập
									</Button>
								</Form.Item>
							</Form>
						)}
					</Formik>
				</Card>
			</Col>
		</div>
	)
}

export default Login
