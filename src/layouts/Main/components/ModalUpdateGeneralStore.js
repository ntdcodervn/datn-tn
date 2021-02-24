import { Button, Col, Image, Input, message, Row, Modal, Form } from "antd"
import React, { useEffect, useState } from "react"
import storeApi from "../../../apis/general"

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}
function ModalUpdateGeneralStore(
	isModalVisible,
	handleOk,
	handleCancel,
	refeshData,
	storeItem
) {
	const [address, setAddress] = useState({
		value: "",
		error: "",
	})
	const [description, setDescription] = useState({
		value: "",
		error: "",
	})
	const [email, setEmail] = useState({
		value: "",
		error: "",
	})
	const [hotline, setHotline] = useState({
		value: "",
		error: "",
	})
	const [workingHour, setWorkingHour] = useState({
		value: "",
		error: "",
	})

	useEffect(() => {
		setAddress({ ...address || "", value: storeItem.address })
		setDescription({ ...description || "", value: storeItem.description })
		setEmail({ ...email || "", value: storeItem.email })
		setHotline({ ...hotline || "", value: storeItem.hotline })
		setWorkingHour({ ...workingHour || "", value: storeItem.workingHour })
	}, [storeItem])

	const onSubmit = async () => {
		if (!address.value) {
			setAddress({
				...address,
				error: "Vui lòng nhập địa chỉ",
			})
		} else if (!description.value) {
			setDescription({ ...description, error: "Vui lòng nhập mô tả" })
		} else if (!email.value) {
			setEmail({ ...email, error: "Vui lòng nhập email" })
		} else if (!hotline.value) {
			setHotline({ ...hotline, error: "Vui lòng nhập số điện thoại" })
		} else if (!workingHour.value) {
			setWorkingHour({
				...workingHour,
				error: "Vui lòng nhập số giờ làm việc",
			})
		}
		try {
			let storeData = await storeApi.updateStoreInfo(
				address.value,
                0,
				description.value,
				email.value,
				hotline.value,
                0,
				workingHour.value
			)
			message.success("Cập nhật thông tin Store thành công")
			refeshData()
			handleCancel()
		} catch (error) {
			message.error("Cập nhật không thành công")
		}
	}
	return (
		<Modal
			title=" Cập nhật thông tin "
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={handleCancel}
			cancelText="Hủy"
			okText="Sửa"
		>
			<Form {...layout} style={{ marginTop: 20 }} layout="vertical">
				<Form.Item
					label="Địa chỉ"
					validateStatus={address.error ? "error" : "success"}
					help={address.error ? address.error : null}
				>
					<Input
						placeholder="Nhập tên thương hiệu"
						value={address.value}
						onChange={(event) =>
							setAddress({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>

				<Form.Item
					label="Mô tả"
					validateStatus={description.error ? "error" : "success"}
					help={description.error ? description.error : null}
				>
					<Input
						placeholder="Nhập mô tả"
						value={description.value}
						onChange={(event) =>
							setDescription({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>
				<Form.Item
					label="Email"
					validateStatus={email.error ? "error" : "success"}
					help={email.error ? email.error : null}
				>
					<Input
						placeholder="Nhập email"
						value={email.value}
						onChange={(event) =>
							setEmail({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>
				<Form.Item
					label="Đường dây nóng"
					validateStatus={hotline.error ? "error" : "success"}
					help={hotline.error ? hotline.error : null}
				>
					<Input
						placeholder="Nhập đường dây nóng"
						value={hotline.value}
						onChange={(event) =>
							setHotline({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>
				<Form.Item
					label="Giờ làm việc"
					validateStatus={workingHour.error ? "error" : "success"}
					help={workingHour.error ? workingHour.error : null}
				>
					<Input
						placeholder="Nhập giờ làm việc"
						value={workingHour.value}
						onChange={(event) =>
							setWorkingHour({
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

export default ModalUpdateGeneralStore
