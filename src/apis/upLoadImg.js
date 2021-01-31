import { postTakenData } from "."

export const upLoadImg = async (file) => {
	try {
		let formData = new FormData()
		formData.append("file", file)
		return await postTakenData("/v1/upload/file", formData)
	} catch (error) {
        throw error;
    }
}
