// export const generateJWT = (key, secret, username) => {
//   const payload = {
//     sub: username,
//     iat: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + 60 * 60, // JWT will expire in 1 hour
//   };

//   const token = jwt.sign(payload, secret, { algorithm: "HS256", issuer: key });

//   return token;
// };
const crypt = require("crypto");

export const generateJWT = (key, secret, username) => {
  return generate(key, secret, username);
  function generate(key, secret, username) {
    var body = {
      uid: key,
      exp: Math.floor(new Date().getTime() / 1000) + 3600,
      iat: Math.floor(new Date().getTime() / 1000) - 10,
      username: username,
    };

    var header = {
      alg: "HS256",
      typ: "JWT",
    };
    var token = [];
    token[0] = base64url(JSON.stringify(header));
    token[1] = base64url(JSON.stringify(body));
    token[2] = genTokenSign(token, secret);

    return token.join(".");
  }

  function genTokenSign(token, secret) {
    if (token.length != 2) {
      return;
    }
    var hash = crypt
      .createHmac("sha256", secret)
      .update(token.join("."))
      .digest("base64");

    console.log({ hash });
    return urlConvertBase64(hash);
  }

  function base64url(input) {
    var base64String = btoa(input);
    console.log({ base64String });
    return urlConvertBase64(base64String);
  }

  function urlConvertBase64(input) {
    var output = input.replace(/=+$/, "");
    output = output.replace(/\+/g, "-");
    output = output.replace(/\//g, "_");
    console.log({ output });
    return output;
  }
};
