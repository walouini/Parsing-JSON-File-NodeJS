const StreamArray = require( 'stream-json/streamers/StreamArray');
const fs = require('fs');

const jsonStream = StreamArray.withParser();

const args = process.argv.slice(2);

//internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream('input.json').pipe(jsonStream.input);

//You'll get json objects here
//Key is the array-index here
jsonStream.on('data', ({ value }) => {
    if(value.id === Number(args[0])){
        console.log(value.name);
    }
});

jsonStream.on('end', () => {
    console.log('All Done');
});