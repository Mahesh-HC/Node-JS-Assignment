const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    if (req.url === "/vegetables") {
        const data = fs.readFileSync("./Data/data1.json", "utf-8")
        res.writeHead(200)
        console.log(data)
        res.end(data)
    }
    else {
        res.writeHead(404)
        res.end("page not found")
    }
})
server.listen(8080, () => console.log("server started"))