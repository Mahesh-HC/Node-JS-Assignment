const http = require("http")
const url = require("url")
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true)

    const qdataName = parsedURL.query.name
    const qdataYear = parsedURL.query.year
    const qdataMonth = parsedURL.query.month
    const qdataDate = parsedURL.query.date

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
    else {
        res.writeHead(404)
        res.end("page not found")
    }
})
server.listen(8080, () => console.log("server started"))
