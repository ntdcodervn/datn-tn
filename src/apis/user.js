import { getTakenData } from "."

const getAllUsers = async (limit, page) => {
	try {
		return await getTakenData("/v1/user/getUsers", { limit, page })
    }
    catch(error) {
        throw error
    }
}

export default {
    getAllUsers,
}
