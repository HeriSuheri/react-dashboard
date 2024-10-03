import SecureLS from "secure-ls";

const ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: "SLAskwqekasdfjSJdswqke",
    encryptionNamespace: "portal",
  });

export const setLocalStorage = (key, value) => ls.set(key, value);
export const getLocalStorage = (key) => ls.get(key);
export const removeLocalStorage = (key) => ls.remove(key);
export const removeAllLocalStorage = () => {
  const keys = ls.getAllKeys();

  keys.forEach((val) => {
    ls.remove(val);
  });
};
