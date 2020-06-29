const Joi = require('@hapi/joi');

const albumValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(255)
      .required(),
  });
  return schema.validate(data);
};

module.exports.albumValidation = albumValidation;
