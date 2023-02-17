import Blog from "../models/Blog.js";

const addLikes = async (req, res) => {
  const userId = req.cookies.userId;
  const blog = await Blog.findOne({ _id: req.params.id });

  if (blog.likedBy.includes(userId)) {
    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: -1 }, $pull: { likedBy: userId } }
    );
    const updatedBlog = await Blog.findOne({ _id: req.params.id });
    res.cookie("userId", userId, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    return res
      .status(201)
      .json({ message: "Post unliked!", blog: updatedBlog });
  }

  try {
    await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 }, $push: { likedBy: userId } }
    );
    const updatedBlog = await Blog.findOne({ _id: req.params.id });
    res.cookie("userId", userId, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    return res.status(201).json({ message: "Post liked!", blog: updatedBlog });
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
