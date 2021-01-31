import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "./context"
import Routers from "./routers"
import Axios from "axios"
import config from "./constants/config"
import "antd/dist/antd.css"
import "./index.css"

Axios.defaults.baseURL = config.BASE_URL_API

ReactDOM.render(
	<Provider>
		<Routers />
	</Provider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
