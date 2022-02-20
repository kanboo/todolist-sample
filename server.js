const http = require('http')
const { v4: uuidV4 } = require('uuid')

const { HEADERS, REQUEST_METHOD } = require('./constants')
const { errorHandle } = require('./errorHandle')

let todos = []

const requestListener = (request, response) => {

  let body = ''
  request.on('data', chunk => {
    body += chunk
  })

  if (request.url === '/todos' && request.method === REQUEST_METHOD.GET) {
    response.writeHead(200, HEADERS)
    response.write(JSON.stringify({
      status: 'success',
      data: todos
    }))
    response.end()
  } else if (request.url === '/todos' && request.method === REQUEST_METHOD.POST) {
    request.on('end', () => {
      try {
        const params = JSON.parse(body)
        const title = params?.title ?? undefined

        if (title) {
          todos.push({
            title,
            uuid: uuidV4()
          })

          response.writeHead(200, HEADERS)
          response.write(JSON.stringify({
            status: 'success',
            data: todos
          }))
          response.end()
        } else {
          errorHandle(response, 400, '資料不齊全')
        }
      } catch {
        errorHandle(response, 400, '建立失敗')
      }
    })

  } else if (request.url === '/todos' && request.method === REQUEST_METHOD.DELETE) {
    todos = []
    
    response.writeHead(200, HEADERS)
    response.write(JSON.stringify({
      status: 'success',
      data: todos
    }))
    response.end()
  } else if (request.method === REQUEST_METHOD.OPTIONS) {
    response.writeHead(200, HEADERS)
    response.end()
  } else {
    errorHandle(response, 404, 'Not found')
  }
}

const server = http.createServer(requestListener)
server.listen(3000)