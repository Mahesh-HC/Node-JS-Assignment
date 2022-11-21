const http = require("http")
const url = require("url")
const fs = require("fs")
const metrics = require("./Data/data2.json")
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true)

    const qdataName = parsedURL.query.name
    const qdataYear = parsedURL.query.year
    const qdataMonth = parsedURL.query.month
    const qdataDate = parsedURL.query.date
    const qdataObject = parsedURL.query.object
    const qdataMetric = parsedURL.query.metric
    const qdataRadius = parsedURL.query.radius

    // problem 1
    
    console.log(`Username ${qdataName}, and the Entered date is(YY-DD-MM) : ${qdataYear} - ${qdataMonth} - ${qdataDate}`)
    if (parsedURL.pathname === "/age") {
        if (qdataName != null && qdataYear != null && qdataMonth != null && qdataDate != null) {
            res.statusCode = 200

            let d = new Date()
            console.log("present date is :", d)
            let presentYear = d.getFullYear()
            let presentMonth = d.getMonth()
            let presentDate = d.getDay()

            let age = presentYear - qdataYear

            if (presentMonth < qdataMonth || (presentMonth === qdataMonth && presentDate < qdataDate)) {
                age = age - 1
            }

            console.log(JSON.stringify(`you are ${age} years old`))
            res.end(JSON.stringify(`you are ${age} years old`))
        }
        else {
            res.writeHead(404)
            res.end("pleae enter all the details")
        }
    }

    // problem 2

    if (req.url === "/vegetables") {
        const data = fs.readFileSync("./Data/data1.json", "utf-8")
        res.writeHead(200)
        console.log(data)
        res.end(data)
    }

    // problem 3

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
