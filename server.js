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
            id: uuidV4()
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
  } else if (request.url.startsWith('/todos/') && request.method === REQUEST_METHOD.DELETE) {
    const id = request.url?.split('/')?.pop() ?? undefined
    const index = todos.findIndex(todo => todo.id === id)

    if (index !== -1) {
      todos.splice(index, 1)

      response.writeHead(200, HEADERS)
      response.write(JSON.stringify({
        status: 'success',
        data: todos
      }))
      response.end()
    } else {
      errorHandle(response, 400, `查無此ID：${id}，刪除失敗。`)
    }
  } else if (request.url.startsWith('/todos/') && request.method === REQUEST_METHOD.PATCH) {
    request.on('end', () => {
      try {
        const params = JSON.parse(body)
        const title = params?.title ?? undefined
        const id = request.url?.split('/')?.pop() ?? undefined
        const index = todos.findIndex(todo => todo.id === id)

        if (title && index !== -1) {
          todos[index].title = title

          response.writeHead(200, HEADERS)
          response.write(JSON.stringify({
            status: 'success',
            data: todos
          }))
          response.end()

        } else {
          errorHandle(response, 400, '查無此ID 或 資料不齊全！')
        }
      } catch {
        errorHandle(response, 400, '更新失敗')
      }
    })
  } else if (request.method === REQUEST_METHOD.OPTIONS) {
    response.writeHead(200, HEADERS)
    response.end()
  } else {
    errorHandle(response, 404, 'Not found')
  }
}

const server = http.createServer(requestListener)
server.listen(3000)