import http from 'node:http'; // from 'node:http' — звідки брати. Префікс node: означає «вбудований модуль Node», а не пакет, встановлений з npm.



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));

    // розширяємо ендпойнти для користувачів та продуктів

    if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ page: "users" }));
    } else if (req.url === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ page: "products" }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(3000, () => {
    console.log('Сервер працює: http://localhost:3000');
});