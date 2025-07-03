const http = require("http");
const express = require("express");

const app = express();

// app is basically a handler function

app.get("/", (req, res) => {
  res.send("hey from home page");
});

app.get("/about", (req, res) => {
    return res.send(`hello ${req.query.name} your age is`);
  });
  
  

// in nodejs
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("Hello World!");
//     res.end();
//   } else if (req.url === "/about") {
//     res.write("this is about page");
//     res.end();
//   }
// });

const Port = 3000;
app.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}/`);
});
