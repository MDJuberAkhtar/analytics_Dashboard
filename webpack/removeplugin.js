const fs = require('fs').promises;
const path = require('path');

const removeFolder = ( location ) => {
    return fs.readdir( location ).then( ( files ) =>{ 

        return Promise.all ( files.map( file => {
            
            const filepath = location + '/' + file;
            
            return fs.stat( filepath ).then( ( stat ) => { 
                if( stat.isDirectory() )return removeFolder( filepath );

                return fs.unlink( filepath );
            })
        }) )

    })
    .then(() => {
        return fs.rmdir( location );
    })
    .catch( err => {
        console.log('Error in Remove Plugin: ', err );
    })
}


class RemovePlugin {

    constructor( options ){
        this.folder = options.folder ;
    }

    apply( compiler ){
        compiler.hooks.done.tap(
            'RemovePlugin', () => {
                const location = path.join( __dirname, '..', 'lib', this.folder );
                removeFolder( location );
            }
        )
    }
}

module.exports = RemovePlugin ;