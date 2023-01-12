const http = require("http")
const fs = require("fs")
const ws = new require("ws")

const wss = new ws.Server({noServer:true})

function accept(req,res) {
    if(req.url === "/ws" && req.headers.upgrade && 
        req.headers.upgrade.toLowerCase() === "websocket" && 
        req.headers.connection.match(/\bupgrade\b/i)) {
            wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect)
    }
    else if(req.url === "/") {
        fs.createReadStream("./index.html").pipe(res)
    }
    else {
        res.writeHead(404)
        res.end()
    }
}
const clients = new Set()

function onSocketConnect(ws) {
    clients.add(ws)
    ws.on("message", function (message) {
        message = message.slice(0,50)
        for(let client of clients) { client.send(message)}
    })
    ws.on("close", function() {
        log(`connection closed`)
        clients.delete(ws)
    })
}
let log
if (require.main === module) {
    log = console.log
    http.createServer(accept).listen(8080)
} else {
    log = function(){}
    exports.accept = accept
}