const path = require('path');

module.exports = env => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname + '/dist'),
            filename: env.production ? 'bglib.min.js' : 'bglib.js',
            library: {
                name: 'bglib',
                type: 'umd'
            }
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
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
                            ]
                        }
                    }
                }
            ]
        }
    }
};