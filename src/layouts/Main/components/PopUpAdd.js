import { CloudUploadOutlined } from "@ant-design/icons"
import { Col, Row, Input, Modal, Image, Button, Form, message } from "antd"
import React, { useRef, useState } from "react"
import { upLoadImg } from "../../../apis/upLoadImg"

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
}

function PopUpAdd({ isModalVisible, handleOk, handleCancel }) {
	const [file, setFile] = useState()
	const [name, setName] = useState({
		error: "",
		value: "",
	})
	const [slug, setSlug] = useState({
		value: "",
		error: "",
	})
	const [image, setImage] = useState({
		value: "",
		error: "",
	})
	const [isLoadingUpLoad, setIsLoadingUpLoad] = useState(false)

	const fileRef = useRef()
	const chooseFile = () => {
		fileRef.current.click()
	}
	const onChangeFile = async (event) => {
		let fileTemp = event.target.files[0]

		if (fileTemp) {
			if (
				fileTemp.type == "image/png" ||
				fileTemp.type == "image/jpeg" ||
				fileTemp.type == "image/jpg"
			) {
				console.log(fileTemp)
				setFile(fileTemp)
				try {
					let imageData = await upLoadImg(fileTemp)
				} catch (error) {
					message.error("Không thể tải ảnh lên")
				}
			} else {
				message.error("Chỉ được chọn định dạng hình PNG, JPEG, JPG")
			}
		} else {
			message.error("Có lỗi xảy ra khi chọn File, vui lòng thử lại")
		}
	}
	const onSubmit = () => {
		if (!name.value) {
			setName({
				...name,
				error: "Vui lòng nhập tên",
			})
		} else if (!slug.value) {
			setSlug({
				...slug,
				error: "Vui lòng nhập đường dẫn",
			})
		} else if (!image.value) {
			message.error("Vui lòng chọn ảnh tải lên")
		}
	}

	return (
		<Modal
			title="Thêm thương hiệu"
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={handleCancel}
			cancelText="Hủy"
			okText="Thêm"
		>
			<Row>
				<Col>
					<Image
						width={100}
						height={100}
						src={file ? URL.createObjectURL(file) : null}
					/>
				</Col>
				<Col
					style={{
						display: "flex",
						alignItems: "center",
						marginLeft: 20,
					}}
				>
					<Button
						icon={<CloudUploadOutlined />}
						type="primary"
						onClick={chooseFile}
						loading={isLoadingUpLoad}
					>
						Tải ảnh lên
					</Button>
				</Col>
			</Row>
			<Form {...layout} style={{ marginTop: 20 }} layout="vertical">
				{/* <Typography>Tên thương hiệu</Typography> */}
				<Form.Item
					label="Tên thương hiệu"
					validateStatus={name.error ? "error" : "success"}
					help={name.error ? name.error : null}
				>
					<Input
						placeholder="Nhập tên thương hiệu"
						onChange={(event) =>
							setName({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>

				<Form.Item
					label="Đường dẫn"
					validateStatus={slug.error ? "error" : "success"}
					help={slug.error ? slug.error : null}
				>
					<Input
						placeholder="Nhập đường dẫn"
						onChange={(event) =>
							setSlug({
								value: event.target.value,
								error: "",
							})
						}
					/>
				</Form.Item>

				<input
					id="myInput"
					type="file"
					ref={fileRef}
					style={{ display: "none" }}
					onChange={onChangeFile}
				/>
			</Form>
		</Modal>
	)
}

export default PopUpAdd
