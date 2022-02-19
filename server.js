const http = require('http')

const REQUEST_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATH: 'PATH'
})

const requestListener = (request, response) => {
  
  const headers = {
    'Content-Type': 'text-plan'
  }

  if (request.url === '/' && request.method === REQUEST_METHOD.GET) {
    response.writeHead(200, headers)
    response.write('Index')
    response.end()
  } else if (request.url === '/' && request.method === REQUEST_METHOD.DELETE) {
    response.writeHead(200, headers)
    response.write('Delete')
    response.end()
  } else {
    response.writeHead(404, headers)
    response.write('Not found')
    response.end()
  }
}

const server = http.createServer(requestListener)
server.listen(3000)