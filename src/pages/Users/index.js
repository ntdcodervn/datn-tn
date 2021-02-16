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
	Pagination,
} from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons"
import userApi from "../../apis/user"
import PopUpAdd from "../../layouts/Main/components/PopUpAdd"
import PopUpEdit from "../../layouts/Main/components/PopUpEdit"
import { render } from "@testing-library/react"

const { Search } = Input

const UserPage = () => {
	const [listUsers, setListUsers] = useState([])
	const [listUserOrigin, setListUserOrigin] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	// const [brandItem, setBrandItem] = useState({
	// 	id: 0,
	// 	brandName: "",
	// 	slug: "",
	// 	brandImage: "",
	// 	published: false,
	// })

	useEffect(() => {
		getAllUserData()
	}, [page])

	// const handleDelete = (key) => {
	// 	setListUsers(listUsers.filter((item) => item.id !== key))
	// }
	// const handleUpdate = (item) => {
	// 	setIsVisibleModalEdit(true)
	// 	setBrandItem({
	// 		id: item.id,
	// 		brandName: item.brandName,
	// 		slug: item.slug,
	// 		brandImage: item.brandImage,
	// 		published: item.published,
	// 	})
	// }
	const columns = [
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: (text) => <p>{text}</p>,
		},
		{
			title: "Họ Tên",
			dataIndex: "fullName",
			key: "fullName",
			render: (text) => <p>{text}</p>,
		},
		{
			title: "Số điện thoại",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Địa chỉ",
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Tên tài khoản",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Giới tính",
			dataIndex: "gender",
			key: "gender",
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Ảnh đại diện",
			dataIndex: "avatarUrl",
			key: "avatarUrl",
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
				console.log(
					"🚀 ~ file: index.js ~ line 82 ~ BrandPage ~ record",
					record
				)
				return (
					<Row style={{ display: "flex" }}>
						<Col xs={9}>
							<Button
								type="primary"
								// onClick={() => handleUpdate(record)}
								icon={<EditOutlined />}
							></Button>
						</Col>
						<Col xs={9}>
							<Popconfirm
								title="Bạn có muốn xóa thương hiệu ?"
								// onConfirm={() => deleteBrandData(record.id)}
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
	// const addBrand = () => {}
	// const editBrand = () => {}
	useEffect(() => {
		getAllUserData()
	}, [])
	const getAllUserData = async () => {
		try {
			setIsLoading(true)
			const data = await userApi.getAllUsers(5, page - 1)
			setListUsers(data.data.data)
			setListUserOrigin(data.data.data)
			setTotalItems(data.data.totalItems)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}
	// const updateBrand = async (id) => {
	// 	try {
	// 		setIsLoading(true)
	// 		await brandApi.updateBrand(id)
	// 		handleUpdate(id)
	// 		message.success("Cap nhat thanh cong")
	// 	} catch (error) {
	// 		message.error("Khong cap nhat thanh cong")
	// 	}
	// }
	// const deleteBrandData = async (id) => {
	// 	try {
	// 		setIsLoading(true)
	// 		await brandApi.deleteBrand(id)
	// 		handleDelete(id)
	// 		message.success("Xóa thành công")
	// 		setIsLoading(false)
	// 	} catch (error) {
	// 		setIsLoading(false)
	// 		message.error("Xóa thất bại, vui lòng thử lại")
	// 	}
	// }
	const searchItem = (keyWord) => {
		// setListUsers(
		// 	listUserOrigin.filter((item) => {
		// 		const string = item.fullName + item.slug + item.id
		// 		return string.indexOf(keyWord) !== -1
		// 	})
		// )
	}

	return (
		<Card title="Quản lý người dùng">
			<Row
				style={{
					display: "flex",
					paddingInline: 20,
					marginBottom: 20,
				}}
			>
				<Col xs={6} style={{ justifyItems: "flex-start" }}>
					<Search
						onChange={(event) => searchItem(event.target.value)}
					></Search>
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
				dataSource={listUsers}
				loading={isLoading}
				pagination={false}
			/>
			{totalItems ? (
				<Pagination
					defaultCurrent={1}
					total={totalItems}
					pageSize={5}
					onChange={(page, pageSize) => {
						setPage(page)
					}}
				/>
			) : null}
			<PopUpAdd
				isModalVisible={isVisible}
				// handleOk={addBrand}
				handleCancel={hideModal}
				refeshData={getAllUserData}
			/>
			{/* <PopUpEdit
				isModalVisible={isVisibleModalEdit}
				// handleOk={editBrand}
				handleCancel={hideModal}
				refeshData={getAllUserData}
				// brandItem={brandItem}
			/> */}
		</Card>
	)
}

export default UserPage
