const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const CopyPlugin = require('copy-webpack-plugin');

class SiteHashesPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('SiteHashesPlugin', stats => {
            if (stats.hasErrors()) {
                return;
            }

            const publicPath = compiler.options.output.path;
            const indexPath = path.join(publicPath, 'index.html');
            let html = fs.readFileSync(indexPath, 'utf8');

            const addHash = (url, files) => {
                const hash = crypto.createHash('sha256');
                files.forEach(file => hash.update(fs.readFileSync(path.join(publicPath, file))));
                html = html.replace(
                    new RegExp(`"${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"?]*?(?:\\?[^"\\s]*)?"`),
                    `"${url}?v=${hash.digest('hex')}"`
                );
            };

            addHash('vendor/bglib/bglib.js', ['vendor/bglib/bglib.js']);
            addHash('css/site.css', ['css/site.css']);
            addHash('js/site.js', ['js/site.js']);
            addHash('vendor/bootstrap/css/bootstrap.min.css', [
                'vendor/bootstrap/css/bootstrap.min.css',
                'vendor/bootstrap/icons/bootstrap-icons.css',
                'vendor/bootstrap/js/bootstrap.bundle.min.js',
                'vendor/jquery/jquery.min.js'
            ]);

            const vendorHash = html.match(/bootstrap\.min\.css\?v=([a-f0-9]+)/)[1];
            [
                'vendor/bootstrap/icons/bootstrap-icons.css',
                'vendor/bootstrap/js/bootstrap.bundle.min.js',
                'vendor/jquery/jquery.min.js'
            ].forEach(url => {
                html = html.replace(new RegExp(`"${url.replace(/\./g, '\\.')}(?:\\?[^"\\s]*)?"`), `"${url}?v=${vendorHash}"`);
            });

            fs.writeFileSync(indexPath, html);
        });
    }
}

module.exports = {
    mode: 'none',
    entry: {},
    output: {
        path: path.resolve(__dirname, 'site/public_html')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'dist/bglib.js', to: 'vendor/bglib/bglib.js' },
                { from: 'site/node_modules/bootstrap/dist/css/bootstrap*', to: 'vendor/bootstrap/css/[name][ext]' },
                { from: 'site/node_modules/bootstrap/dist/js/bootstrap*', to: 'vendor/bootstrap/js/[name][ext]' },
                { from: 'site/node_modules/bootstrap-icons/font/bootstrap-icons.css', to: 'vendor/bootstrap/icons/bootstrap-icons.css' },
                { from: 'site/node_modules/bootstrap-icons/font/fonts', to: 'vendor/bootstrap/icons/fonts' },
                { from: 'site/node_modules/jquery/dist/jquery.min.js', to: 'vendor/jquery/jquery.min.js' }
            ]
        }),
        new SiteHashesPlugin()
    ]
};
