import axios from "axios"
import rateLimit from "axios-rate-limit"
import { BASE_URL_V1 } from "../../constants/config"

axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"

// CREATE AN INSTANCE OF AXIOS
const axiosInstance = rateLimit(
	axios.create({
		baseURL: BASE_URL_V1,
		timeout: 200000,
	}),
	{ maxRequests: 1, perMilliseconds: 1000 }
)

axiosInstance.defaults.timeout = 20000

const getTakenData = async (url, params = {}) => {
	let token = localStorage.getItem("@token")
	if (!token) throw new Error("Token not available!")

	try {
		const result = await axiosInstance.get(url, {
			params: params,
			headers: { Authorization: "Bearer " + token },
		})
		return result
	} catch (e) {
		throw e
	}
}

const postTakenData = async (url, data) => {
	let token = localStorage.getItem("@token")
	if (!token) throw new Error("Token not available!")

	try {
		const result = await axiosInstance.post(url, data, {
			headers: { Authorization: "Bearer " + token },
		})
		return result
	} catch (e) {
		throw e
	}
}

const putTakenData = async (url, data) => {
	let token = localStorage.getItem("@token")
	if (!token) throw new Error("Token not available!")

	try {
		const result = await axiosInstance.put(url, data, {
			headers: { Authorization: "Bearer " + token },
		})
		return result
	} catch (e) {
		throw e
	}
}

const deleteTakenData = async (url, data) => {
	let token = localStorage.getItem("@token")
	if (!token) throw new Error("Token not available!")

	try {
		const result = await axiosInstance.delete(url, {
			params: params,
			headers: { Authorization: "Bearer " + token },
		})
		return result
	} catch (e) {
		throw e
	}
}

export { getTakenData, postTakenData, deleteTakenData, putTakenData }
