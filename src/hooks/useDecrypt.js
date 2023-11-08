import { useState } from "react";
import crypto from "crypto";

export function useDecryptData(data, secret) {
  const [decryptedData, setDecryptedData] = useState(null);

  // Create a decipher object using the AES-256-CBC algorithm and the secret key
  const decipher = crypto.createDecipher("aes-256-cbc", secret);

  // Update the decipher object with the encrypted data
  let decrypted = decipher.update(data, "hex", "utf8");

  // Finalize the decipher object and append the remaining decrypted data
  decrypted += decipher.final("utf8");

  // Set the decrypted data as the state
  setDecryptedData(decrypted);

  return { decryptedData };
}
