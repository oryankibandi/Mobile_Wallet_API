const verifyPin = async (user_uid, user_pin, wallet, cryptoInstance) => {
  try {
    const decrypted_priv_key = cryptoInstance.decipher(
      wallet.encrypted_private_key,
      user_pin,
      wallet.initialization_vector
    );

    const hash = cryptoInstance.generateHash(
      user_uid.concat("", decrypted_priv_key),
      "verification"
    );

    if (hash !== wallet.verification_string) {
      throw new Error("Invalid pin provided");
    }

    return true;
  } catch (error) {
    throw new Error("Wrong PIN");
  }
};

module.exports = verifyPin;
