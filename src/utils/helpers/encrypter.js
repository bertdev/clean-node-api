const bcrypt = require('bcrypt')

module.exports = class Encrypter {
  async compare (data, hash) {
    const isValid = await bcrypt.compare(data, hash)
    return isValid
  }
}
