import React, { useEffect, useState } from "react"

import {
	Button,
	Card,
	Col,
	Input,
	Row,
	Table,
	Image,
	message,
	Popconfirm,
} from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons"
import brandApi from "../../apis/brand"
import PopUpAdd from "../../layouts/Main/components/PopUpAdd"
import PopUpEdit from "../../layouts/Main/components/PopUpEdit"
import { render } from "@testing-library/react"

const { Search } = Input

const BrandPage = () => {
	const [listBrands, setListBrands] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const handleDelete = (key) => {
		setListBrands(listBrands.filter((item) => item.id !== key))
	}
	const handleUpdate = (key) => {
		setIsVisibleModalEdit(true)
		render(
			<PopUpEdit
				isModalVisible={isVisibleModalEdit}
				handleOk={editBrand}
				handleCancel={hideModal}
				refeshData={getAllBrandData}
				id={key}
			/>
		)
	}
	const columns = [
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: (text) => <p>{text}</p>,
		},
		{
			title: "Tên Thương Hiệu",
			dataIndex: "brandName",
			key: "brandName",
			render: (text) => <p>{text}</p>,
		},
		{
			title: "Đường Dẫn",
			dataIndex: "slug",
			key: "slug",
		},
		{
			title: "Hình Ảnh",
			dataIndex: "brandImage",
			key: "brandImage",
			render: (url) => (
				<Image
					src={url}
					style={{ width: 50, height: 50, objectFit: "cover" }}
				/>
			),
		},
		{
			title: "Sự kiện",
			dataIndex: "event",
			key: "event",
			render: (_, record) => {
				return (
					<Row style={{ display: "flex" }}>
						<Col xs={9}>
							<Button
								type="primary"
								onClick={() => handleUpdate(record.id)}
								icon={<EditOutlined />}
							></Button>
						</Col>
						<Col xs={9}>
							<Popconfirm
								title="Bạn có muốn xóa thương hiệu ?"
								onConfirm={() => deleteBrandData(record.id)}
							>
								<Button
									type="danger"
									icon={<DeleteOutlined />}
								></Button>
							</Popconfirm>
						</Col>
					</Row>
				)
			},
		},
	]

	const showModal = () => {
		setIsVisible(true)
	}
	const showModalEdit = (id) => {
		setIsVisibleModalEdit(true)
	}
	const hideModal = () => {
		setIsVisible(false)
		setIsVisibleModalEdit(false)
	}
	const addBrand = () => {}
	const editBrand = () => {}
	useEffect(() => {
		getAllBrandData()
	}, [])
	const getAllBrandData = async () => {
		try {
			setIsLoading(true)
			const data = await brandApi.getAllBrand(15, 0)
			setListBrands(data.data.data)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}
	const updateBrand = async (id) => {
		try {
			setIsLoading(true)
			await brandApi.updateBrand(id)
			handleUpdate(id)
			message.success("Cap nhat thanh cong")
		} catch (error) {
			message.error("Khong cap nhat thanh cong")
		}
	}
	const deleteBrandData = async (id) => {
		try {
			setIsLoading(true)
			await brandApi.deleteBrand(id)
			handleDelete(id)
			message.success("Xóa thành công")
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			message.error("Xóa thất bại, vui lòng thử lại")
		}
	}

	return (
		<Card title="Quản lý thương Hiệu">
			<Row
				style={{
					display: "flex",
					paddingInline: 20,
					marginBottom: 20,
				}}
			>
				<Col xs={6} style={{ justifyItems: "flex-start" }}>
					<Search></Search>
				</Col>
				<Col xs={6} style={{ alignItems: "flex-end" }}>
					<Button
						type="primary"
						onClick={showModal}
						icon={<PlusCircleOutlined />}
					>
						thêm
					</Button>
				</Col>
			</Row>
			<Table
				columns={columns}
				dataSource={listBrands}
				loading={isLoading}
				pagination={{
					style: { padding: "0 24px" },
					total: 20,
					pageSize: 10,
				}}
			/>
			<PopUpAdd
				isModalVisible={isVisible}
				handleOk={addBrand}
				handleCancel={hideModal}
				refeshData={getAllBrandData}
			/>
			<PopUpEdit
				isModalVisible={isVisibleModalEdit}
				handleOk={editBrand}
				handleCancel={hideModal}
				refeshData={getAllBrandData}
				// id={id}
			/>
		</Card>
	)
}

export default BrandPage
