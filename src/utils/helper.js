export const setAuthLocal = (token) => {
	localStorage.setItem("@token", token)
}

export const getAuthLocal = () => {
	let token = localStorage.getItem("@token")
	if (token) {
		return token
	}
	return null
}

export const removeTokenLocal = () => {
	localStorage.removeItem("@token")
}
