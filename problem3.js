const http = require("http")
const metrics = require("./Data/data2.json")
const url = require("url")
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true)
    const qdataObject = parsedURL.query.object
    const qdataMetric = parsedURL.query.metric
    const qdataRadius = parsedURL.query.radius

    if (parsedURL.pathname === "/metrics") {

        const result = metrics.find((item) => item.object === qdataObject && item.metric === qdataMetric)
        console.log(result)
        console.log("radius is :", qdataRadius)
        if (qdataObject != null && qdataMetric != null && qdataRadius != null) {
            let area;

            // for area of circle a=PI*r*r
            if (result.object === "circle" && result.metric === "area") {
                area = Math.PI * qdataRadius * qdataRadius
                area = Math.round(area * 100) / 100
            }

            // for area of sphere a=4*PI*r*r
            if (result.object === "sphere" && result.metric === "area") {
                area = 4 * Math.PI * qdataRadius * qdataRadius
                area = Math.round(area * 100) / 100
            }

            // for volume of sphere v=(4/3)*PI*r*r
            if (result.object === "sphere" && result.metric === "volume") {
                area = (4 / 3) * Math.PI * qdataRadius * qdataRadius
                area = Math.round(area * 100) / 100
            }

            res.writeHead(200)
            res.end(`The ${qdataMetric} of a ${qdataObject} is : ${area}`)
            console.log(`The ${qdataMetric} of a ${qdataObject} is : ${area}`)
        }
        else {
            res.writeHead(404)
            res.end("enter the fields of object, metric and radius")
        }
    }
    else {
        res.writeHead(404)
        res.end("page not found")
    }

})
server.listen(8080, () => console.log("server started"))