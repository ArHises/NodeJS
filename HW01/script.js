/* 
Урок 1. Введение в Node.js

Напишите HTTP сервер и реализуйте два обработчика, где:
— По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
— А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
— Также реализуйте обработку несуществующих роутов (404).
— * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.
*/
const http = require("http");

let homeViews = 0;
let aboutViews = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    homeViews++;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<html><body>
                <h1>Home Page</h1>
                <p>This page has been viewed ${homeViews} times.</p>
                <a href="/about">Go to About Page</a>
               </body></html>`);
  } else if (req.url === "/about") {
    aboutViews++;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<html><body>
                <h1>About Page</h1>
                <p>This page has been viewed ${aboutViews} times.</p>
                <a href="/">Go to Home Page</a>
               </body></html>`);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`<html><body>
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/">Go to Home Page</a>
               </body></html>`);
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
