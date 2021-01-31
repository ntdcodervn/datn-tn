import React from "react"

import { Card, Table } from "antd"

const columns =[
    {
        title: "Tên Thương Hiệu",
        dataIndex: "name",
        key: "name",
        render: (text) => <p>{text}</p>
    },
    {
        title: "Đường Dẫn",
        dataIndex: "slug",
        key: "slug",
    },
    {
        title: "Hình Ảnh",
        dataIndex: "image",
        key: "image",
        render: (url) => <img src={url} style={{width: "100%", height: "100%"}}/>
    }
]

const data = [{
    //get brand data
}]
const BrandPage = () => {
    
	return <Card title="Thương Hiệu">
        <Table
				columns={columns}
				dataSource={data}
				// onRow={onRowClick}
				pagination={{
					style: { padding: "0 24px" },
					total: 20,
					pageSize: 10,
					// onChange: onPageChange,
				}}
			/>
    </Card>
}

export default BrandPage
