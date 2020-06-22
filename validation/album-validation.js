const Joi = require('@hapi/joi');

const albumValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .max(255)
      .required(),
    author: Joi.string()
      .min(6)
      .max(255)
      .required(),
    date: {
      type: Date,
      default: Date.now
    },
  });
  return schema.validate(data);
};

module.exports.loginValidation = albumValidation;
