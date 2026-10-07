import CryptoJS from 'crypto-js'

export const encrypt = (value, key) => CryptoJS.AES.encrypt(value, key).toString()

export const decrypt = (encryptedValue, key) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
