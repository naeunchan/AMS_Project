const path = require("path");

module.exports = {
	babel: {
		presets: ["@emotion/babel-preset-css-prop"],
	},
	webpack: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
		},
	},
};
