import axios from "axios"

export const getEvents = ({ page = 1, per_page = 10 }) => {
	return axios
		.get(`/api/v1/event?page=${page}&per_page=${per_page}`)
		.then((res) => res.data)
}

export const addEvent = (data) => {
	return axios.post(`/api/v1/event/create`, data).then((res) => res.data)
}
