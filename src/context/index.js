import React from "react"
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

	if (state.isLoading) return null

	return (
		<AppContext.Provider value={{ ...state, set }}>
			{props.children}
		</AppContext.Provider>
	)
}
