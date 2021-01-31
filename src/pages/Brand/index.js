import React, { useEffect, useState } from "react"

import { Button, Card, Col, Row, Table } from "antd"
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons"
import brandApi from "../../apis/brand"
import PopUpAdd from "../../layouts/Main/components/PopUpAdd"

const columns = [
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
			<img
				src={url}
				style={{ width: 50, height: 50, objectFit: "cover" }}
			/>
		),
	},
	{
		title: "Sự kiện",
		dataIndex: "event",
		key: "event",
		render: (editFunction, deleteFuntion) => (
			<Row>
				<Col xs={6}>
					<Button type="primary" icon={<EditOutlined />}>
						Sửa
					</Button>
				</Col>
				<Col xs={6}>
					<Button type="danger" icon={<DeleteOutlined />}>
						Xóa
					</Button>
				</Col>
			</Row>
		),
	},
]

const BrandPage = () => {
	const [listBrands, setListBrands] = useState([])
	const [isVisible, setIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const showModal = () => {
		setIsVisible(true)
	}
	const hideModal = () => {
		setIsVisible(false)
	}
	const addBrand = () => {}

	useEffect(() => {
		getAllBrandData()
	}, [])
	const getAllBrandData = async () => {
		try {
            setIsLoading(true);
            const data = await brandApi.getAllBrand(15, 0)
            setListBrands(data.data.data)
            setIsLoading(false)
			console.log(
				"🚀 ~ file: index.js ~ line 46 ~ getAllBrandData ~ data",
				data.data.data
			)
		} catch (error) {
            setIsLoading(false)
        }
	}
	return (
		<Card title="Thương Hiệu">
			<Row
				style={{
					justifyContent: "flex-end",
					paddingInline: 20,
					marginBottom: 20,
				}}
			>
				<Col xs={2}>
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
					// onChange: onPageChange,
				}}
			/>
			<PopUpAdd
				isModalVisible={isVisible}
				handleOk={addBrand}
				handleCancel={hideModal}
			/>
		</Card>
	)
}

export default BrandPage
