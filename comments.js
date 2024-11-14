// Create web server
// Load comments from file
// Add comment to file
// Serve comments to client
// Load comments from file
// Add comment to file
// Serve comments to client

// 1. Create web server
// 2. Load comments from file
// 3. Add comment to file
// 4. Serve comments to client

// 1. Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/comments') {
        fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// 2. Load comments from file
// 3. Add comment to file
// 4. Serve comments to client

const comments = require('./comments.js');

server.on('request', (req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === '/comments' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(data);
            comments.add(comment, (err, comment) => {
                if (err)git add comments.js