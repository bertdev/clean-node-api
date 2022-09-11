const request = require('supertest')
let app

describe('Content-type Middleware', () => {
  beforeEach(() => {
    jest.resetModules()
    app = require('./../config/app')
  })

  test('Should return json content-type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })
    const response = await request(app)
      .get('/test_content_type')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  test('Should return xml content-type if is forced', async () => {
    app.get('/test_content_type', (req, res) => {
      res.type('xml')
      res.send('')
    })
    const response = await request(app)
      .get('/test_content_type')
    expect(response.headers['content-type']).toMatch(/xml/)
  })
})
