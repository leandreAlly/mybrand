import Blog from "../models/Blog.js";

const addLikes = async (req, res) => {
  const clientIp = req.ip;
  const blog = await Blog.findOne({ _id: req.params.id });

  if (blog.likedBy.includes(clientIp)) {
    return res
      .status(400)
      .json({ message: "You have already liked this post!" });
  }

  try {
    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 }, $push: { likedBy: clientIp } }
    );

    const updatedBlog = await Blog.findOne({ _id: req.params.id });

    return res.status(201).json({ message: "Likes added!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const likeCounter = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id }).select(
      "BlogTitle likes"
    );

    if (!blog)
      return res.status(204).json({ message: "Can't find blog with given Id" });

    return res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(500).json({ error: "something Went wrong...!" });
  }
};

export { addLikes, likeCounter };
