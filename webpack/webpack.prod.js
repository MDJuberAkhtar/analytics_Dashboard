const path = require( 'path' ) ;
const fs = require( 'fs' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );
const RemovePlugin = require( './removeplugin.js' );

const commonRules = require( './rules' );



const rootPaths =[
    {
        folder: 'components',
        path:path.join( __dirname, '..', 'src', 'components' ),
        extension: '.js'
    },
    {
        folder: 'hooks',
        path:path.join( __dirname, '..', 'src', 'hooks' ),
        extension: '.js'
    },
    {
        folder: 'css-js-emits',
        nameSuffix: '.min',
        path: path.join( __dirname, '..' , 'src', 'styles' ),
        extension: '.css'
    }
] 

const filesReducer = ( root, base = {} ) => {
    return fs.readdirSync( root.path ).reduce( ( acc, name ) => {
        if( fs.statSync( `${ root.path }/${ name }` ).isDirectory() ) return filesReducer({
            ...root.folder &&  { folder: root.folder + '/' + name },
            path: path.join( root.path, name ),
            extension: root.extension
        }, acc )

        const nameWithoutExt = name.match(/(.+)\./)[ 1 ];
        acc[ nameWithoutExt +  ( root.nameSuffix ?? '' ) ] = { 
            import : path.join( root.path, name ),
            ...root.folder && { filename: `${ root.folder }/${ nameWithoutExt + root.extension }` }
        }  

        return acc ;

    } , base )
}


const entryPoints = rootPaths.reduce( ( main, entry ) =>  { 
                           
                            const entries = filesReducer( entry );
                            Object.assign( main, entries );

                            return main ;

                        }, {});

module.exports = {
    mode:'production',
    entry: entryPoints,
    output:{
        path: path.join( __dirname, '..', 'lib' ),
        libraryTarget:'commonjs2',
        clean: true
    },
    resolve:{
        extensions: [ '.ts', '.js', '.tsx' ]
    },
    module: {
        rules: [ ...commonRules, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use:[
                MiniCSSExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        } ]
    },
    externals:{
        vue:{
            root:'vue',
            commonjs:'vue',
            commonjs2:'vue',
            amd:'vue'
        },
        'vue-router':{
            root:'vue-router',
            commonjs:'vue-router',
            commonjs2:'vue-router',
            amd:'vue-router'
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new MiniCSSExtractPlugin({
            filename:"styles/[name].css",
            chunkFilename:"styles/[id].css"
        }),
        new RemovePlugin({
            folder: 'css-js-emits'
        })
    ]
}