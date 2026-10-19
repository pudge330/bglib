const fs = require('node:fs');
const path = require('node:path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const license = fs.readFileSync(path.resolve(__dirname, 'src/license.txt'), 'utf8').trimEnd();

function createConfig(format, production) {
    const esm = format === 'esm';

    return {
        name: `${format}-${production ? 'production' : 'development'}`,
        entry: esm ? './src/index.mjs' : './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: esm
                ? `bglib.esm${production ? '.min' : ''}.mjs`
                : `bglib${production ? '.min' : ''}.js`,
            library: esm ? { type: 'module' } : { name: 'bglib', type: 'umd' },
            globalObject: 'this'
        },
        experiments: esm ? { outputModule: true } : undefined,
        mode: production ? 'production' : 'development',
        devtool: 'source-map',
        optimization: {
            minimize: production,
            minimizer: production ? [
                new TerserPlugin({ extractComments: false })
            ] : []
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: license,
                raw: true
            })
        ],
        module: {
            rules: [
                {
                    test: /\.png$/i,
                    type: 'asset/inline'
                },
                {
                    test: /\.css$/i,
                    use: 'css-content-loader'
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    modules: false,
                                    targets: "> 0.25%, not dead"
                                }]
                            ]
                        }
                    }
                }
            ]
        }
    };
}

module.exports = env => {
    const format = env && env.format;
    const production = env && env.production;

    if (format) {
        return createConfig(format, Boolean(production));
    }

    return [
        createConfig('umd', false),
        createConfig('umd', true),
        createConfig('esm', false),
        createConfig('esm', true)
    ];
};
