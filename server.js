const http = require('http')

const requestListener = (request,response)=>{
    response.writeHead(200,{'Content-Type':'text-plan'})
    response.write('Hello guys')
    response.end()
}

const server = http.createServer(requestListener)
server.listen(3000)