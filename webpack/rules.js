module.exports = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use:[
            {
                loader: 'babel-loader',
                options:{
                    presets:[ '@babel/preset-env' ],
                    plugins: [ 
                        '@babel/plugin-transform-runtime',
                        '@babel/plugin-transform-async-to-generator',
                        '@vue/babel-plugin-jsx',
                        'jsx-v-model'
                        
                    ]
                }
            },
            {
                loader: 'ts-loader',
                options:{
                    appendTsSuffixTo:[/\.vue$/]
                }
            }
        ]
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader'
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
            {
                loader: 'babel-loader',
                options:{
                    presets:[
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|gif)$/i,
        exclude: /node_modules/,
        use:[
            {
                loader: 'url-loader',
                options:{
                    mimetype: 'image/png'
                }
            }
        ]
    },
    {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use:[
            {
                loader: 'svg-url-loader'
            }
        ]
    },
]