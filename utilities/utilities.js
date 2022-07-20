const bcrypt = require("bcrypt");

async function passHash(str) {
  return await bcrypt.hash(str, 3);
}

module.exports = passHash;
