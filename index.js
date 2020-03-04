const http = require('http');
const ca = require('win-ca');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {

    // Set a response type of plain text for the response
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // certificate fetch 
    let certificates = []

    // Fetch all certificates in PEM format from My store
    ca({
        format: ca.der2.pem,
        store: ['My'],
        ondata: crt => certificates.push(crt)
    })

    // Send back a response and end the connection
    res.end("Certificate count under 'My' store is" + certificates.length);
});

let port = process.env.PORT || 3000;

// Start the server on port 3000
app.listen(port);

console.log('Node server running on port ' + port);