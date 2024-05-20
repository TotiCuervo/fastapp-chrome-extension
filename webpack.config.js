const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: path.resolve('./src/index.tsx'),
        contentScript: path.resolve('./src/content/index.tsx'),
        background: path.resolve('./src/background/background.ts'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [tailwindcss, autoprefixer],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/tailwind.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/static'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/logo.png'), to: path.resolve('dist/assets/logo.png') }
            ],
        }),
        ...getHtmlPlugins(['index']),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'contentScript';
            },
        },
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: 'React extension',
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
