const MongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a collection', async () => {
    const collection = await MongoHelper.getCollection('users')
    expect(collection).toBeTruthy()
  })

  test('Should return a reconnect when getCollection() is invoked and client is disconnected', async () => {
    await MongoHelper.disconnect()
    expect(MongoHelper.client).toBeFalsy()
    await MongoHelper.getCollection('users')
    expect(MongoHelper.client).toBeTruthy()
  })
})
