import React from "react"
import { removeTokenLocal } from "../utils/helper"
// import axios from 'axios';
// import * as authAPI from './apis/auth';

const initialState = {
	isLoading: false,
	isAuth: false,
	user: null,
}

export const AppContext = React.createContext()

export const Provider = (props) => {
	const [state, setState] = React.useState(initialState)

	const set = (context) => {
		if (context) {
			if (typeof context === "function") {
				setState(context)
			} else {
				setState((s) => ({ ...s, ...context }))
			}
		}
	}

	const logout = () => {
		setState((s) => ({ ...s, isAuth: false }))
		removeTokenLocal()
	}

	if (state.isLoading) return null

	return (
		<AppContext.Provider value={{ ...state, set, logout }}>
			{props.children}
		</AppContext.Provider>
	)
}
