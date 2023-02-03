import Joi from "@hapi/joi";

const BlogSchema = Joi.object({
  blogTitle: Joi.string(),
  blogContent: Joi.string(),
});

const validateBlog = (blogData) => {
  return BlogSchema.validate(blogData, { abortEarly: false });
};

export default validateBlog;
