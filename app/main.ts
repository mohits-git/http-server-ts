import * as net from 'net';
import fs from 'fs';
import pathNode from 'path';

let dir: null | string = null;
if (process.argv[2] === '--directory') {
    dir = process.argv[3];
}

const server = net.createServer((socket) => {
    socket.on('data', (data: Buffer) => {
        const request = data.toString();
        console.log('----------Request----------')
        console.log(request)
        const path = request.split(' ')[1];

        if (path.startsWith('/echo/')) {
            const str = path.substring(6);
            const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`;
            socket.write(response);
        }
        else if (path === "/user-agent") {
            const arr = request.split('\r\n');
            const userAgentHeader = arr.find((ele) => ele.includes('User-Agent:'));
            if (userAgentHeader) {
                const userAgent = userAgentHeader?.split(' ')[1];
                const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
                socket.write(response);
            }
        }
        else if (path.startsWith('/files/')) {
            if (!dir) {
                socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
            }
            else {
                const fileName = path.substring(7);
                try {
                    const file = fs.readFileSync(pathNode.join(dir, fileName), 'utf-8');
                    socket.write(`HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${file.length}\r\n\r\n${file}`);
                } catch (error) {
                    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
                }
            }
        }
        else {
            const response = path === '/' ? 'HTTP/1.1 200 OK\r\n\r\n' : 'HTTP/1.1 404 Not Found\r\n\r\n';
            socket.write(response);
        }
        socket.end();
    })
});

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

server.listen(4221, 'localhost', () => {
    console.log('Server is running on port 4221');
});
