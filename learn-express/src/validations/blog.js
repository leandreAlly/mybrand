import Joi from "@hapi/joi";

const BlogSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(5).required(),
});

const validateBlog = (blogData) => {
  return BlogSchema.validate(blogData);
};

export default validateBlog;
