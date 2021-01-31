export const setAuthLocal = (token) => {
	localStorage.setItem("@token", JSON.stringify(token))
}

export const getAuthLocal = () => {
	let token = localStorage.getItem("@token")
	if (token) {
		return JSON.parse(token)
	}
	return null
}

export const removeTokenLocal = () => {
	localStorage.removeItem("@token")
}
