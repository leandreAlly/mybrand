import Joi from "@hapi/joi";

const MessageSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  email: Joi.string().required(),
  message: Joi.string().min(5).required(),
});

const validateMessage = (blogData) => {
  return MessageSchema.validate(blogData, { abortEarly: false });
};

export default validateMessage;
