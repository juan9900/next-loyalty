import crypto from "crypto";
export const encrypt = (api) => {
  const salt = process.env.ENCRYPT_SALT;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  console.log({ salt: process.env.NEXT_PUBLIC_ENCRYPT_SALT });
  console.log({ secretKey: process.env.NEXT_PUBLIC_SECRET_KEY });
  console.log({ api });

  const generateSecretKey = () => {
    // Generate a 32-byte secret key.
    return crypto.randomBytes(12);
  };

  const encrypt = (data, salt, secretKey) => {
    // Create a cipher object
    const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, salt);

    // Encrypt the data
    let encryptedData = cipher.update(data, "utf8", "hex");
    encryptedData += cipher.final("hex");

    // Return encrypted data
    return encryptedData;
  };

  encrypt(api, salt, generateSecretKey());
};

/*
// Extract the createHmac function from the crypto module
  const createHmac = crypto.createHmac;

  // Create a secret string
  const secret = "abcdefg";

  // Create a hash using the SHA-256 algorithm
  const hash = createHmac("sha256", secret)
    // Add the message to the hash
    .update(api)

    // Convert the hash to a hexadecimal string
    .digest("hex");

  // Print the resulting hash
  console.log({ hash });

  // Return the resulting hash
  return hash;*/
