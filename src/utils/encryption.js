import CryptoJS from 'crypto-js';

/**
 * Encrypts a plain text password using a user-provided secret PIN.
 */
export const encryptPassword = (plainText, secretPin) => {
  if (!plainText || !secretPin) return '';
  // AES encryption returns a ciphertext string
  return CryptoJS.AES.encrypt(plainText, secretPin).toString();
};

/**
 * Decrypts the ciphertext back to plain text using the user's secret PIN.
 */
export const decryptPassword = (cipherText, secretPin) => {
  if (!cipherText || !secretPin) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretPin);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    // If the PIN is wrong, the output will be blank
    if (!originalText) throw new Error("Invalid PIN");
    
    return originalText;
  } catch (error) {
    console.error("Decryption failed. Incorrect Vault PIN.");
    return 'Decrypt Error - Wrong PIN';
  }
};
