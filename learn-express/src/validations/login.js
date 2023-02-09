import Joi from "@hapi/joi";

const AdminSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const validateAdmin = (blogData) => {
  return AdminSchema.validate(blogData, { abortEarly: false });
};

export default validateAdmin;
