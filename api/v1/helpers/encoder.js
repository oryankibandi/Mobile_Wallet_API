const textEncoding = require("text-encoding");

const toUint8Array = (string) => {
  let TextEncoder = textEncoding.TextEncoder;
  return new TextEncoder().encode(string);
};

const toHexString = (uint8Arr) => {
  let TextDecoder = textEncoding.TextDecoder;
  return new TextDecoder().decode(uint8Arr);
};

module.exports = {
  toUint8Array,
  toHexString,
};
