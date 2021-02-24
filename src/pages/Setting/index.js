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
import storeApi from "../../apis/general"
import PopUpAdd from "../../layouts/Main/components/PopUpAdd"
import PopUpEdit from "../../layouts/Main/components/PopUpEdit"
import ModalUpdateGeneralStore from "../../layouts/Main/components/ModalUpdateGeneralStore"

// const { Search } = Input
const Setting = () => {
	const [listStore, setListStore] = useState([])
	const [listBrandOrigin, setListBrandOrigin] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isVisibleModalEdit, setIsVisibleModalEdit] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [totalItems, setTotalItems] = useState(0)
	const [storeItem, setStoreItem] = useState({
		address: "",
		description: "",
		email: "",
		hotline: "false",
		workingHour: "",
	})
	// useEffect(() => {
	// 	getStoresInfo()
	// }, [page])

	const handleUpdate = (item) => {
		setIsVisibleModalEdit(true)
		setStoreItem({
			address: item.address,
			description: item.description,
			email: item.email,
			hotline: item.hotline,
			workingHour: item.workingHour,
		})
	}
	const columns = [
		{
			title: "Địa Chỉ",
			dataIndex: "address",
			key: "address",
			render: (text) => <p>{text}</p>,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Đường dây nóng",
			dataIndex: "hostline",
			key: "hostline",
		},
		{
			title: "Giờ làm việc",
			dataIndex: "workingHour",
			key: "workingHour",
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
								onClick={() => handleUpdate(record)}
								icon={<EditOutlined />}
							></Button>
						</Col>
					</Row>
				)
			},
		},
	]

	const hideModal = () => {
		setIsVisible(false)
		setIsVisibleModalEdit(false)
	}

	const editStore = () => {}

	useEffect(() => {
		getStoresInfo()
	}, [])
	
	const getStoresInfo = () => async () => {
		try {
			setIsLoading(true)
			const data = await storeApi.getStoreInfo()
			setListStore(data.data.data)
			// setListBrandOrigin(data.data.data)
			setTotalItems(data.data.totalItems)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}
	const updateBrand = async (id) => {
		try {
			setIsLoading(true)
			await storeApi.updateBrand(id)
			handleUpdate(id)
			message.success("Cap nhat thanh cong")
		} catch (error) {
			message.error("Khong cap nhat thanh cong")
		}
	}

	// const searchItem = (keyWord) => {
	// 	console.log(
	// 		"🚀 ~ file: index.js ~ line 165 ~ searchItem ~ keyWord",
	// 		keyWord
	// 	)
	// 	console.log("list brand origin", listBrandOrigin)
	// 	setListStore(
	// 		listBrandOrigin.filter((item) => {
	// 			const string = item.brandName + item.slug + item.id
	// 			return string.indexOf(keyWord) !== -1
	// 		})
	// 	)
	// }
	return (
		<Card title="Quản lý chung">
			{/* <Row
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
			</Row> */}
			<Table
				columns={columns}
				dataSource={listStore}
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

			<ModalUpdateGeneralStore
				isModalVisible={isVisibleModalEdit}
				handleOk={editStore}
				handleCancel={hideModal}
				refeshData={getStoresInfo}
				storeItem={storeItem}
			/>
		</Card>
	)
}

export default Setting
