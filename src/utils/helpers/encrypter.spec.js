const bcrypt = require('bcrypt')

class Encrypter {
  async compare (data, hash) {
    const isValid = await bcrypt.compare(data, hash)
    return isValid
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = new Encrypter()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(false)
  })
})
