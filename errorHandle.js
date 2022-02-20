const { HEADERS } = require('./constants')

const errorHandle = (response, statusCode, message) => {
  response.writeHead(statusCode, HEADERS)
  response.write(JSON.stringify({
    status: 'false',
    message
  }))
  response.end()
}

module.exports = {
  errorHandle
}