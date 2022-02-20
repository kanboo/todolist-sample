const { HEADERS } = require('./constants')

const errorHandle = (response, statusCode, message) => {
  response.writeHead(statusCode, HEADERS)
  response.write(JSON.stringify({
    status: 'false',
    message
  }))
  response.end()
}

const successHandle = (response, todos) => {
  response.writeHead(200, HEADERS)
  response.write(JSON.stringify({
    status: 'success',
    data: todos
  }))
  response.end()
}

module.exports = {
  errorHandle,
  successHandle
}