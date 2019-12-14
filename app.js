require('dotenv').config()

const {
	SPOTIFY_CID = '',
	REDIRECT_URI = '',
	PORT = 3000
} = process.env

const express = require('express')
const app = express()
const path = require('path')

app.use('/',express.static(path.join(__dirname, 'public')))

app.get('/login', (req, res) => {
	let scopes = 'user-read-private user-read-email'

	res.redirect('https://accounts.spotify.com/authorize' +
		'?response_type=code' +
		'&client_id=' + SPOTIFY_CID +
		(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		'&redirect_uri=' + encodeURIComponent(REDIRECT_URI))
})




app.listen(PORT, () => {
	console.log(PORT)
})
