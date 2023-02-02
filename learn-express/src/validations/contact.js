import Joi from "@hapi/joi";

const QuerySchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().min(5).required(),
  message: Joi.string().min(5).required(),
});

const validateContact = (queryData) => {
  return QuerySchema.validate(queryData);
};

export default validateContact;
