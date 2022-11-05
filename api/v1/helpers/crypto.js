const {
  scrypt,
  randomFill,
  createCipheriv,
  createDecipheriv,
} = require("node: crypto");
const Events = require("node:events");

class Crypto extends Events {
  constructor() {
    super();
  }

  cipher(cipherText, password) {
    const algorithm = "aes-192-cbc";

    scrypt(password, "salt", 24, (err, key) => {
      if (err) throw err;

      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;
        console.log("iv:", iv);
        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(cipherText, "utf8", "hex");
        encrypted += cipher.final("hex");
        console.log(encrypted);

        this.emit("encrypted", iv, encrypted);
      });
    });
  }

  decipher(decipherText, password, init_vector) {
    const algorithm = "aes-192-cbc";
    const key = scryptSync(password, "salt", 24);

    const decipher = createDecipheriv(algorithm, key, init_vector);

    let decrypted = decipher.update(decipherText, hex, "utf8");
    decrypted += decipher.final("utf8");
    this.emit("decrypted", decrypted);
  }
}
