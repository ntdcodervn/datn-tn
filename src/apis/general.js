import { getTakenData, postTakenData } from "."

const getStoreInfo = async () => {
	try {
		return await getTakenData("/getStoreInfo")
	} catch (error) {
		throw error
	}
}
const updateStoreInfo = async (
	address,
	createBy,
	description,
	email,
	hotline,
	updatedBy,
	workingHour
) => {
	try {
		return await postTakenData("​/updateStoreInfo", {
			address,
			createBy,
			description,
			email,
			hotline,
			updatedBy,
			workingHour,
		})
	} catch (error) {
		throw error
	}
}
export default {
	getStoreInfo,
	updateStoreInfo,
}
