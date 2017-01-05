module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        path: './dist',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html/, loader: "html" },
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel?presets[]=es2015&presets[]=react&presets[]=stage-0"]}
        ]
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    }
};