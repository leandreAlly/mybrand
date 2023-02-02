import validateContact from "../validations/contact.js";

const isValid = async (req, res, next) => {
  const { error } = validateContact(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    next();
  } catch {
    console.log("something Went wrong....!");
  }
};

export default isValid;
