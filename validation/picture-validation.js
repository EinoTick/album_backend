const Joi = require('@hapi/joi');

const pictureValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(4)
      .max(255)
      .required(),
    pictureUrl: Joi.string()
      .min(4)
      .max(1000)
      .required(),
    albumId: Joi.string()
      .min(4)
      .max(50)
      .required(),
  });
  return schema.validate(data);
};

module.exports.pictureValidation = pictureValidation;
