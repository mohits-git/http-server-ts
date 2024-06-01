import * as net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request: string = data.toString();
        const path = request.split(' ')[1];

        if (path.startsWith('/echo/')) {
            const str = path.substring(6);
            const response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`;
            socket.write(response);
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
