const bcrypt = require("bcrypt");

async function hashMiddlewareForUpdate(next) {
  const update = this.getUpdate();

  if (update.password || (update.$set && update.$set.password)) {
    try {
      const passwordToHash = update.password || update.$set.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passwordToHash, salt);

      if (update.password) {
        update.password = hashedPassword;
      } else if (update.$set) {
        update.$set.password = hashedPassword;
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
}

module.exports = hashMiddlewareForUpdate;
