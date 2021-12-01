const path = require("path");

module.exports = {
	babel: {
		presets: ["@emotion/babel-preset-css-prop"],
	},
	webpack: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@style": path.resolve(__dirname, "src/style"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@validators": path.resolve(__dirname, "src/validators"),
			"@api": path.resolve(__dirname, "src/api"),
		},
	},
};
