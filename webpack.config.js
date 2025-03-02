const webpack = require('webpack');

module.exports = {
    // Suas outras configurações do Webpack aqui...
    resolve: {
        fallback: {
            "process": require.resolve("process/browser")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
};
