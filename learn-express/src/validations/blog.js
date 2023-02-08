import Joi from "@hapi/joi";

const BlogSchema = Joi.object({
  blogTitle: Joi.string().min(5).max(255).required(),
  blogContent: Joi.string().min(5).required(),
});

const validateBlog = (blogData) => {
  return BlogSchema.validate(blogData, { abortEarly: false });
};

export default validateBlog;
