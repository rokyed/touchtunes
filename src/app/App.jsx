import React from 'react'
import style from './App.scss'
import Login from 'App/login/Login.jsx'
import Dashboard from 'App/dashboard/Dashboard.jsx'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			code: this.initSession()
		}
	}

	initSession() {
		let code = localStorage.getItem('code')

		if (!code)
			code = this.getCodeFromURI()


		return code
	}

	getCodeFromURI() {
		let currentLocation = window.location.href
		try {
			let vars = currentLocation.split('?')[1].split('&')

			for (let i = 0; i < vars.length; i++) {
				if (vars[i].indexOf('code') === 0) {
					let code = decodeURIComponent(vars[i].split('=')[1])
					localStorage.setItem('code', code)
					return code
				}
			}
		}catch (e) {
			console.error(e)
			return null
		}
	}

	render() {
		let view = this.state.code ? <Dashboard /> : <Login />

		return (
			<div className={style.component}>
				<div className="topbar">
					Spotify Artist Search
				</div>
				<div className="content">
					{view}
				</div>
			</div>
		)
	}
}
