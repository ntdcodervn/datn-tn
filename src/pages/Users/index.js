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
	Switch,
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
import ModalChangePassword from "../../layouts/Main/components/ModalChangePassword"

const { Search } = Input

const UserPage = () => {
	const [listUsers, setListUsers] = useState([])
	const [currentUser, setCurrentUser] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [userItem, setUserItem] = useState({
		currentPassword: "",
		newPassword: "",
	})
	const [active, setActive] = useState("")
	useEffect(() => {
		getAllUserData()
	}, [page])

	// const handleDelete = (key) => {
	// 	setListUsers(listUsers.filter((item) => item.id !== key))
	// }
	const handleChangePassword = async (item) => {
		setIsVisible(true)

		// setCurrentUser({
		// 	...currentUser,
		// 	id: item.id,
		// 	currentPassword: item.currentPassword,
		// 	newPassword: item.newPassword,
		// })
	}
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
			render: (_, record) => (
				<Switch
					unCheckedChildren="khóa"
					checkedChildren="Mở"
					checked={record.status}
					onChange={() => changeActiveUser(record)}
				/>
			),
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
					"🚀 ~ file: index.js ~ line 119 ~ UserPage ~ record",
					record
				)
				return (
					<Row style={{ display: "flex" }}>
						<Col xs={9}>
							<Button
								type="primary"
								onClick={() => handleChangePassword(record)}
								icon={<EditOutlined />}
							></Button>
						</Col>
					</Row>
				)
			},
		},
	]

	const showModal = () => {
		setIsVisible(true)
	}
	const hideModal = () => {
		setIsVisible(false)
	}
	// const addBrand = () => {}
	// const editBrand = () => {}
	useEffect(() => {
		getCurrentUser()
	}, [])
	useEffect(() => {
		getAllUserData()
	}, [])
	const getAllUserData = async () => {
		try {
			setIsLoading(true)
			const data = await userApi.getAllUsers(5, page - 1)
			setListUsers(data.data.data)
			setTotalItems(data.data.totalItems)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}
	const getCurrentUser = async () => {
		try {
			const userData = await userApi.getCurrentUser()
			setCurrentUser(userData.data)
		} catch (error) {
			message.error("Error", error)
		}
	}
	const changeActiveUser = async () => {
		const userData = await userApi.getCurrentUser()
		console.log("🚀 ~ file: index.js ~ line 187 ~ changeActiveUser ~ userData.data", userData.data)
		// if (userData.data.status !== "ACTIVE") {
		// 	setActive("ACTIVE")
		// } else {
		// 	setActive("UNACTIVE")
		// }
		// try {
		// 	setIsLoading(true)
		// 	let activeUser = await userData.changeActiveUser(active)
		// 	// let updateInfoUser = await userData.updateUserInfo()
		// 	message.success("Thay doi thanh cong")
		// } catch (error) {
		// 	message.error("Khong the thay doi trang thai")
		// }
	}

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
			<ModalChangePassword
				isModalVisible={isVisible}
				handleCancel={hideModal}
				refeshData={getAllUserData}
				userItem={userItem}
			/>
		</Card>
	)
}

export default UserPage
