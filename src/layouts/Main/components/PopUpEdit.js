import React, { useRef, useState } from "react"
import { upLoadImg } from "../../../apis/upLoadImg"
import brandApi from "../../../apis/brand"
import { Button, Col, Image, Input, message, Row, Modal, Form } from "antd"
import { CloudUploadOutlined } from "@ant-design/icons"

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}
function PopUpEdit({ isModalVisible, handleOk, handleCancel, refeshData, id }) {
	console.log("🚀 ~ file: PopUpEdit.js ~ line 14 ~ PopUpEdit ~ id", id)
	const data = brandApi.getAllBrand(`/${id}`)
    console.log("🚀 ~ file: PopUpEdit.js ~ line 14 ~ PopUpEdit ~ data", data)
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
				fileTemp.type === "image/png" ||
				fileTemp.type === "image/jpeg" ||
				fileTemp.type === "image/jpg"
			) {
				try {
					let imageData = await upLoadImg(fileTemp)
					setImage({ ...image, value: imageData.data.message })
				} catch (error) {
					message.error(" Không thể tải ảnh lên")
				}
			} else {
				message.error(" Chỉ được chịn định dạng hình PNG, JPEG, JPG")
			}
		} else {
			message.error("Có lỗi trong quá trình chọn File, vui lòng thử lại")
		}
	}
	const onSubmit = async () => {
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
			message.error("Vui lòng tải ảnh lên")
		}
		try {
			// let brandData = await brandApi.updateBrand(
			// 	image.value,
			// 	name.value,
			// 	true,
			// 	"/" + slug.value
			// )
			message.success("Cập nhật thương hiệu thành công")
			// refeshData()
			// handleCancel()
		} catch (error) {
			message.error("Cập nhật không thành công")
		}
	}
	return (
		<Modal
			title="Cập nhật thương hiệu"
			visible={isModalVisible}
			onOk={onSubmit}
			onCancel={handleCancel}
			cancelText="Hủy"
			okText="Sửa"
		>
			<Row>
				<Col>
					<Image
						width={100}
						height={100}
						src={image.value ? image.value : null}
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

				<Input
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

export default PopUpEdit
