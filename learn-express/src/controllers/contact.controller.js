import Queries from "../models/Queries.js";

// Get all queries
const getAllContactMessage = async (req, res) => {
  try {
    const queryList = await Queries.find();
    return res.status(200).json({ queries: queryList });
  } catch {
    res.status(404);
    res.send({ msg: "no query message" });
  }
};

const postContactMessage = async (req, res) => {
  try {
    const query = new Queries({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await query.save();
    res.status(201).json({ queries: query });
  } catch {
    res.status(404);
    res.send({ error: "some error occured" });
  }
};

export { getAllContactMessage, postContactMessage };
