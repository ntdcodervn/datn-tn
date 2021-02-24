import { getTakenData, postTakenData } from "."

const getAllUsers = async (limit, page) => {
	try {
		return await getTakenData("/v1/user/getUsers", { limit, page })
	} catch (error) {
		throw error
	}
}

const getCurrentUser = async () => {
	try {
		return await postTakenData("/v1/user/getCurrentUser")
	} catch (error) {
		throw error
	}
}

const changePassword = async (currentPassword, newPassword) => {
	try {
		return postTakenData("/v1/user/changePassword", {
			currentPassword,
			newPassword,
		})
	} catch (error) {
		throw error
	}
}

const changeActiveUser = async (status) => {
	try {
		return postTakenData("​/v1​/user​/activeAccount", {
			status
		})
	} catch (error) {
		throw error
	}
}

const updateUserInfo = async (params)=>{
	try{
		return postTakenData("​/v1​/user​/updateInfo", params);
	}
	catch (error){
		throw error
	}
}

export default {
	getAllUsers,
	getCurrentUser,
	changePassword,
	changeActiveUser,
	updateUserInfo
}
