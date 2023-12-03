/*HomeWork 6 PartB Server
Sanchay Kanade sk2656
*/

const http = require('http');

//These are the valid content type suported by the server
const supprotedContentTypes = ['application/json', 'text/plain', 'text/xml'];
const rtt = 99;

const server = http.createServer((req, res) => {
    
    const delay = Math.random() * rtt;  //in milliseconds
    setTimeout(() => {

        //Check for POST request
        if (req.method !== 'POST') {
            console.log("Invalid request method");
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.end('Invalid Method. Please use POST method.');
            return
        }

        const contentType = req.headers['content-type']

        //Check for supported content types
        if (!supprotedContentTypes.includes(contentType)) {
            console.log("Invalid Content Type")
            res.writeHead(415, { 'Content-Type': 'text/plain' });
            res.end(`Unsupported content type. Valid content-types are: ${supprotedContentTypes} `)
            return
        }
        console.log(contentType)

        //Variable to store body
        var stream = '';

        req.on('data', chunk => {
            stream += chunk
        });

        //Parsing the body and sending back the response
        req.on('end', (end) => {
            try {
                let parsedBody;

                if (contentType === 'application/json') {
                    parsedBody = JSON.parse(stream);
                } else if (contentType === 'text/plain') {
                    parsedBody = stream;
                    
                } else if (contentType === 'text/xml') {
                    parsedBody = stream;
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(JSON.stringify(parsedBody));
            } catch (err) {
                console.log(err);
                res.writeHead(400, { 'Content-Type': contentType });
                res.end(JSON.stringify('Bad Request, unable to parse request body.'))
            }
        });
    },delay);
});

server.listen(8080);

console.log("Server listening on port 8080");

//Exporting module
module.exports = { server };