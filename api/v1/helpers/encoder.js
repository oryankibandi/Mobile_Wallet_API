const textEncoding = require("text-encoding");

const toUint8Array = (string) => {
  let TextEncoder = textEncoding.TextEncoder;
  return new TextEncoder("utf-8").encode(string);
};

const toHexString = (uint8Arr) => {
  let TextDecoder = textEncoding.TextDecoder;
  return new TextDecoder("utf-8").decode(uint8Arr);
};

module.exports = {
  toUint8Array,
  toHexString,
};
