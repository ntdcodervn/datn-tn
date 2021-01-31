import React from "react"
import { Table, Divider, Tag, Card } from "antd"

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <p>{text}</p>,
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
		dataIndex: "tags",
		render: (tags) => (
			<span>
				{tags.map((tag) => {
					let color = tag.length > 5 ? "geekblue" : "green"
					if (tag === "loser") {
						color = "volcano"
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					)
				})}
			</span>
		),
	},
	{
		title: "Action",
		key: "action",
		render: (text, record) => (
			<span>
				<p>Invite {record.name}</p>
				<Divider type="vertical" />
				<p>Delete</p>
			</span>
		),
	},
]

const data = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
]

const onPageChange = (page) => {
	// setState(s => ({ ...s, page }))
}

const onRowClick = (transaction) => {
	// setState(s => ({ ...s, transaction }))
}

const User = (props) => {
	return (
		<Card title="Users" bodyStyle={{ padding: 0 }}>
			<Table
				columns={columns}
				dataSource={data}
				onRow={onRowClick}
				pagination={{
					style: { padding: "0 24px" },
					total: 20,
					pageSize: 10,
					onChange: onPageChange,
				}}
			/>
		</Card>
	)
}

export default User
