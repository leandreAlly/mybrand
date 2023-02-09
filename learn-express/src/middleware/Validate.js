// import validateBlog from "../validations/index.js";

import validateBlog from "../validations/blog.js";
import validateMessage from "../validations/message.js";
import validateAdmin from "../validations/login.js";
import validateComment from "../validations/comment.js";

const isValid = (validationType) => {
  return (req, res, next) => {
    let error, validateFn;
    if (validationType === "blog") {
      validateFn = validateBlog;
    } else if (validationType === "message") {
      validateFn = validateMessage;
    } else if (validationType === "login") {
      validateFn = validateAdmin;
    } else if (validationType === "comment") {
      validateFn = validateComment;
    } else {
      return res.status(400).json({ message: "Invalid validation type" });
    }

    ({ error } = validateFn(req.body, { abortEarly: false }));
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    try {
      next();
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  };
};

export default isValid;
