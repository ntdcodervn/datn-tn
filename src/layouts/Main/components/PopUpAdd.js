import { CloudUploadOutlined } from "@ant-design/icons"
import { Col, Row, Input, Modal, Image, Button, Form, message } from "antd"
import React, { useRef, useState } from "react"
import { upLoadImg } from "../../../apis/upLoadImg"
import brandApi from "../../../apis/brand"


const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
}

function PopUpAdd({ isModalVisible, handleOk, handleCancel, refeshData }) {	
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
				try {
					let imageData = await upLoadImg(fileTemp)
                    setImage({
                        ...image,
                        value : imageData.data.message
                    })
				} catch (error) {
                    console.log(error)
					message.error("Không thể tải ảnh lên")
				}
			} else {
				message.error("Chỉ được chọn định dạng hình PNG, JPEG, JPG")
			}
		} else {
			message.error("Có lỗi xảy ra khi chọn File, vui lòng thử lại")
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
			message.error("Vui lòng chọn ảnh tải lên")
		}
		try {
			let brandData = await brandApi.postBrand(
                image.value,
                name.value,
                true,
                "/"+slug.value
            )
            message.success("Thêm thành công")
            refeshData();
            handleCancel();
		} catch (error) {
			message.error("Không thêm thương hiệu được", error)
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
