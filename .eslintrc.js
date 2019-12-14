module.exports = {
	"parser": "babel-eslint",
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"globals": {
		"document": true,
		"window": true,
		"console": true,
		"__dirname": true
	},
	"rules": {
		"semi": "never",
		"eqeqeq": "ignore"
	}
}
