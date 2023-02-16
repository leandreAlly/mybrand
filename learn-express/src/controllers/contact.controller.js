import Queries from "../models/Queries.js";

// Get all queries
const getAllContactMessage = async (req, res) => {
  try {
    const queryList = await Queries.find();
    return res.status(200).json({ queries: queryList });
  } catch {
    res.status(404).json({ message: "no query message" });
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
    res.status(404).json({ message: "Bad request" });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const query = await Queries.findByIdAndRemove(req.params.id);
    if (!query)
      return res
        .status(404)
        .send({ message: "query with given ID was not found!" });
    res.status(200).json({ message: "Query deleted" });
  } catch (error) {
    res.status(404).json({ message: "Query doesn't exist!" });
  }
};

export { getAllContactMessage, postContactMessage, deleteMessage };
