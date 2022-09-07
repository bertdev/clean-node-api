const bcrypt = require('bcrypt')

class Encrypter {
  async compare (data, hash) {
    const isValid = await bcrypt.compare(data, hash)
    return isValid
  }
}

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_data', 'hashed_data')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_data', 'hashed_data')
    expect(bcrypt.data).toBe('any_data')
    expect(bcrypt.hash).toBe('hashed_data')
  })
})
