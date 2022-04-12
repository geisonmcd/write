const fs = require('fs');
const https = require('https');
(function () {
    https.get('https://api.agify.io?name[]=michael&name[]=matthew&name[]=jane', (res) => {

        let persons = '';

        res.on('data', (chunk) =>{
            persons += chunk;
        });

        res.on('end', ()=> {
            
            const writeStream = fs.createWriteStream('output.txt');
            for(let person of JSON.parse(persons)) {
                if (person.name[0] === 'm') {
                    writeStream.write(person.age + "\n");
                }
            }
            writeStream.end();
            writeStream.on('finish', () => {
                let read = fs.readFileSync('output.txt', 'utf-8')
                console.log(read)
            })
        })
    })
})()