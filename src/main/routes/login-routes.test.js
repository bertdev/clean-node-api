const request = require('supertest')
const app = require('./../config/app')
const MongoHelper = require('./../../infra/helpers/mongo-helper')
const bcrypt = require('bcrypt')

let userModel
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid credentials are provided', async () => {
    await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 30,
      password: await bcrypt.hash('hashed_password', 10)
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      .expect(200)
  })
})
