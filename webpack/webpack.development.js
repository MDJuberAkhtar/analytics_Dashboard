const path = require( 'path' ) ;
const { VueLoaderPlugin } = require( 'vue-loader' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const commonRules = require( './rules' );

module.exports = {
    mode:'development',
    entry: path.resolve( __dirname, '..' , 'src' , 'index.ts' ),
    resolve:{
        extensions: [ '.ts', '.js', '.tsx' ]
    },
    module: {
        rules: [ ...commonRules , {
            test: /\.scss$/,
            exclude: /node_modules/,
            use:[
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        } ]
    },
    devServer:{
        historyApiFallback: true
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve( __dirname, '..' , 'public' , 'index.html' )
        })
    ]
}