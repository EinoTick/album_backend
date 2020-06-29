const Joi = require('@hapi/joi');

const pictureValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(255)
      .required(),
  });
  return schema.validate(data);
};

module.exports.pictureValidation = pictureValidation;
