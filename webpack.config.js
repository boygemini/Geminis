const path = require("path");

module.exports = {
	entry: "./src/index.js", // The entry point of your application
	output: {
		filename: "bundle.js", // The name of the bundled output file
		path: path.resolve(__dirname, "dist"), // The output directory (usually a 'dist' folder)
	},
	resolve: {
		fallback: {
			https: require.resolve("https-browserify"),
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
			url: require.resolve("url/"),
			http: require.resolve("stream-http"),
			child_process: require.resolve("child_process"),
			fs: require.resolve("browserify-fs"), // Add this line
			zlib: require.resolve("browserify-zlib"), // Add this line
			os: require.resolve("os-browserify/browser"), // Add this line
			querystring: require.resolve("querystring-es3"), // Add this line
			buffer: require.resolve("buffer/"), //
			assert: require.resolve("assert/"), // Add this line
			net: require.resolve("net/"), // Add
		},
	},
	// Add other configuration options as needed
};
