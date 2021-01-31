import { postTakenData } from "."

export const login = async (email, password) => {
	return postTakenData("/v1/auth/op_login", {
		username: email,
		password,
	})
}

export const forgotPassword = async (email) => {
	return postTakenData("/v1/auth/forgotPassword", {
		email,
	})
}

export const resetPassword = async (currentPassword, newPassword, token) => {
	return postTakenData("/v1/auth/resetPassword", {
		currentPassword,
		newPassword,
		token,
	})
}
