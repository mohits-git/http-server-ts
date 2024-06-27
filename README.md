## HTTP Server with Typescript from Scratch

This is a simple HTTP server built with Typescript.

[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) is the
protocol that powers the web. I built a HTTP/1.1 server
which is capable of serving multiple clients.

Along the way learnt about TCP servers,
[HTTP request syntax](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html),
and more.

#### Features
- This HTTP server is built using the [Net | Node](https://nodejs.org/api/net.html#net) module, which allow us to create stream-based TCP servers.
- This http server can -
   - Simply parses the upcoming request and `request-target` and `method` (GET or POST) and send response accordingly.
   - parse the request Headers and Send back Headers with response.
   - Send back the HTTP body data.
- Also implemented the HTTP compression for the HTTP response body with `gzip` via [`node:zlib`](https://nodejs.org/api/zlib.html#zlib) API
