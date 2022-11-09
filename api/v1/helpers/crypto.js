const {
  scrypt,
  scryptSync,
  randomFill,
  createCipheriv,
  createDecipheriv,
  randomUUID,
  createHash,
  generateKeyPair,
  randomBytes,
} = require("node:crypto");
const { Buffer } = require("node:buffer");
const Events = require("node:events");

class Crypto extends Events {
  constructor() {
    super();
  }

  cipher(cipherText, pin) {
    const algorithm = "aes-192-cbc";

    scrypt(pin, "salt", 24, (err, key) => {
      if (err) throw err;

      const iv = Buffer.alloc(16, randomBytes(8).toString("base64"), "utf-8");
      const cipher = createCipheriv(algorithm, key, iv);

      let encrypted = cipher.update(cipherText, "utf8", "hex");
      encrypted += cipher.final("hex");

      this.emit("encrypted", iv.toString(), encrypted);
    });
  }

  decipher(decipherText, password, init_vector) {
    const algorithm = "aes-192-cbc";
    const key = scryptSync(password, "salt", 24);

    const decipher = createDecipheriv(algorithm, key, Buffer.from(init_vector));

    let decrypted = decipher.update(decipherText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    this.emit("decrypted", decrypted);

    return decrypted;
  }

  generateUid() {
    let random_uid = randomUUID();
    let d = new Date(Date.now());
    const uid = random_uid.concat(
      "-",
      d.getMinutes().toString(),
      d.getSeconds().toString(),
      d.getMilliseconds().toString()
    );

    const formated_uid = uid.split("-").join("");
    return formated_uid;
  }

  generateHash(data, type) {
    if (!data) throw new Error("No data provided to hash");

    const hash = createHash("shake256", { outputLength: 32 });

    hash.update(data);

    const new_hash = hash.digest("hex");

    switch (type) {
      case "password":
        this.emit("passwordHash", new_hash);
        break;
      case "verification":
        this.emit("verificationHash", new_hash);
      default:
        break;
    }

    return new_hash;
  }

  createKeyPair() {
    generateKeyPair(
      "ec",
      {
        modulusLength: 530,
        namedCurve: "secp256k1",
        publicKeyEncoding: {
          type: "spki",
          format: "der",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "der",
        },
      },
      (err, publicKey, privateKey) => {
        if (err) throw new Error(err.message);
        this.emit(
          "keyPairCreated",
          publicKey.toString("hex"),
          privateKey.toString("hex")
        );
      }
    );
  }
}

module.exports = Crypto;
