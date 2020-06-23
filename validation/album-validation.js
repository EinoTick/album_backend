const Joi = require('@hapi/joi');

const albumValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(4)
      .max(255)
      .required(),
    date: {
      type: Date,
      default: Date.now
    },
  });
  return schema.validate(data);
};

module.exports.albumValidation = albumValidation;
