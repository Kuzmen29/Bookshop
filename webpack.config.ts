import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface EnvVariables {
    mode: string,
    port: number,
    analyzer: boolean
}

const cssLoader = {
    loader: "css-loader",
    // options: {
    //     modules: true,
    // },
}
let config = function (env: EnvVariables) {
    return (
        {
            mode: env.mode ?? 'development',
            entry: './src/index.tsx',
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            "style-loader",
                            cssLoader,
                            "sass-loader",
                        ],
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            output: {
                filename: '[name].[contenthash].js',
                path: path.resolve(__dirname, 'dist'),
                clean: true,
                publicPath: '/'
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'Bookshop',
                    favicon: './src/favicon.ico',
                    template: './public/index.html'   // Для нашего html
                })
            ],
            devServer: {
                static: {
                    directory: path.join(__dirname, 'dist'),
                },
                port: env.port ?? 5000,
                historyApiFallback: true,
            },
        }
    )
}

export default config;