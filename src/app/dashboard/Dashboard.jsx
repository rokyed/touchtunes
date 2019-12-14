import React from 'react'
import style from './Dashboard.scss'
import axios from 'axios'

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentScreen:"search"
		}
	}

	render() {
		let view = this.renderSearch()

		if (this.state.currentScreen == "artist")
			view = null
		else if (this.state.currentScreen == "album")
			view = null

		return (
			<div>
				{view}
			</div>
		)
	}

	renderSearch() {
		return (
			<div>
				<input type="text" onChange={(e)=> {this.onSearchTextChange.bind(this)}}/>
				<div onClick={this.onArtistSearch.bind(this)}>Go</div>
			</div>
		)
	}

	onSearchTextChange(e) {
		this.setState({
			searchText: e.target.value
		})
	}

	async onArtistSearch() {
		let artist = this.state.searchTex
		let response = await axios({
			method: 'GET',
			url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist`,
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('code')
			}
		})

		debugger
	}

	async onArtistSelect() {

	}
}
