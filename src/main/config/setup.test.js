const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/ping', (req, res) => {
      res.send('pong')
    })
    const response = await request(app)
      .get('/ping')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
