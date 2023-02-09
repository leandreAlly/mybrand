import Joi from "@hapi/joi";

const CommentSchema = Joi.object({
  name: Joi.string().min(5).max(55).required(),
  content: Joi.string().min(5).max(500).required(),
});

const validateComment = (blogData) => {
  return CommentSchema.validate(blogData, { abortEarly: false });
};

export default validateComment;
