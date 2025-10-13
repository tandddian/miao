const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8000;
const server = http.createServer();

const baseDir = "d:/Ahomework";

server.on("request", (req, res) => {
  let url = new URL(`http://127.0.0.1:${port}/${req.url}`);
  console.log(req.method, req.url);

  let targetPath = path.join(baseDir, decodeURIComponent(url.pathname));

  fs.stat(targetPath, (err, stat) => {
    if (err) {
      res.writeHead(404);
      res.end();
    } else if (stat.isFile()) {
      fs.readFile(targetPath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end();
        } else {
          res.write(data);
          res.end();
        }
      });
    } else if (stat.isDirectory()) {
      if (url.pathname.endsWith("/")) {
        let indexPath = path.join(targetPath, "index.html");

        fs.readFile(indexPath, (err, data) => {
          if (err) {
            fs.readdir(targetPath, { withFileTypes: true }, (err, entries) => {
              if (err) {
                res.writeHead(500);
                res.end();
              } else {
                res.writeHead(200, {
                  "content-type": "text/html; charset=utf8",
                });
                res.write(`<h1>Index of ${url.pathname}</h1>`);
                if (url.pathname == '/') {
                  res.write(`<div><a href="..">../</a></div>`);
                }

                for (let entry of entries) {
                  res.write(
                    `<div><a href="${entry.name}${
                      entry.isDirectory() ? "/" : ""
                    }">${entry.name}${entry.isDirectory() ? "/" : ""}</a></div>`
                  );
                }
              }
            });
          } else {
            res.write(data);
            res.end;
          }
        });
      } else {
        res.writeHead(302, {
          location: `localhost:${port}` + url.pathname + "/" + url.search,
        });
        res.end();
      }
    } else {
    }
  });
});

server.listen(port, () => {
  console.log(process.pid);
  console.log("Server listening on port", port);
});
