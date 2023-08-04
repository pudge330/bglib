const path = require('path');

module.exports = env => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname + '/dist'),
            filename: env.production ? 'bglib.min.js' : 'bglib.js',
            library: 'bglib',
            libraryTarget:'var'
        },
        mode: env.production ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /.png$/,
                    use: 'base64-image-loader'
                },
                {
                    test: /.css$/,
                    use: 'css-content-loader'
                }
            ]
        }
    }
};