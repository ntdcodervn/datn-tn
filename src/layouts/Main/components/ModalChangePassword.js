import React, { useRef, useState } from "react"
import userApi from "../../../apis/user"
import { Input, message, Modal, Form } from "antd"

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}
function ModalChangePassword({
	isModalVisible,
	handleOk,
	handleCancel,
	refeshData,
	userItem,
}) {
    console.log("🚀 ~ file: ModalChangePassword.js ~ line 16 ~ userItem", userItem)
	// const [id, setId] = useState({
	// 	value: "",
	// })
	const [currentPassword, setCurrentPassword] = useState({
		value: "",
		error: "",
	})
	const [newPassword, setNewPassword] = useState({
		value: "",
		error: "",
	})

	// useEffect(() => {
	// 	// setId({
	// 	// 	value: userItem.id,
	// 	// })
	// 	setCurrentPassword({
	// 		...currentPassword,
	// 		value: userItem.password,
	// 	})
	// 	// setNewPassword({
	// 	// 	...image,
	// 	// 	value: userItem.brandImage,
	// 	// })
	// }, [brandItem])

	const onSubmit = async () => {
		if (!currentPassword.value) {
			setCurrentPassword({
				...currentPassword,
				error: "Vui lòng nhập mật khẩu hiện tại",
			})
		} else if (!newPassword.value) {
			setNewPassword({
				...newPassword,
				error: "Vui lòng nhập mật khẩu mới",
			})
		}
		try {
			let userData = await userApi.changePassword(
				currentPassword.value,
				newPassword.value
			)
			message.success("Thay đổi mật khẩu thành công")
			refeshData()
			handleCancel()
		} catch (error) {
			message.error("Thay đổi mật khẩu thất bại")
		}
	}
	return (
		<Modal
			title="Thay đổi mật khẩu"
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={handleCancel}
			cancelText="Hủy"
			okText="Ok"
		>
			<Form {...layout} style={{ marginTop: 20 }} layout="vertical">
				<Form.Item
					label="Mật khẩu hiện tại"
					validateStatus={currentPassword.error ? "error" : "success"}
					help={currentPassword.error ? currentPassword.error : null}
				>
					<Input
						placeholder="Nhập mật khẩu hiện tại"
						value={currentPassword.value}
						onChange={(event) =>
							setCurrentPassword({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>

				<Form.Item
					label="Mật khẩu mới"
					validateStatus={newPassword.error ? "error" : "success"}
					help={newPassword.error ? newPassword.error : null}
				>
					<Input
						placeholder="Nhập mật khẩu mới"
						value={newPassword.value}
						onChange={(event) =>
							setNewPassword({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default ModalChangePassword
