import Blog from "../models/Blog.js";

// export const addLikes = async (req, res) => {
//   await Blog.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } });
//   const blog = await Blog.findOne({ _id: req.params.id });

//   return res.status(201).json({ meessage: "Likes added!", blog: blog });

const addLikes = async (req, res) => {
  const clientIp = req.ip;
  const blog = await Blog.findOne({ _id: req.params.id });

  if (blog.likedBy.includes(clientIp)) {
    return res
      .status(400)
      .json({ message: "You have already liked this post!" });
  }

  await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { likes: 1 }, $push: { likedBy: clientIp } }
  );

  const updatedBlog = await Blog.findOne({ _id: req.params.id });

  return res.status(201).json({ message: "Likes added!", blog: updatedBlog });
};

const likeCounter = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id }).select(
    "BlogTitle likes"
  );

  if (!blog)
    return res.status(204).json({ message: "Can't find blog with given Id" });

  return res.status(200).json({ blog: blog });
};

export { addLikes, likeCounter };
