const http = require('http')

const REQUEST_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATH: 'PATH',
  OPTIONS: 'OPTIONS'
})

const requestListener = (request, response) => {

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

  if (request.url === '/' && request.method === REQUEST_METHOD.GET) {
    response.writeHead(200, headers)
    response.write(JSON.stringify({
      status: 'success',
      data: []
    }))
    response.end()
  } else if (request.method === REQUEST_METHOD.OPTIONS) {
    response.writeHead(200, headers)
    response.end()
  } else {
    response.writeHead(404, headers)
    response.write(JSON.stringify({
      status: 'false',
      message: 'Not found'
    }))
    response.end()
  }
}

const server = http.createServer(requestListener)
server.listen(3000)