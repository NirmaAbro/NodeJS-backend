const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World!");
    res.end();
  } else if (req.url === "/about") {
    res.write("this is about page");
    res.end();
  }
});

const Port = 3000;
server.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}/`);
});
