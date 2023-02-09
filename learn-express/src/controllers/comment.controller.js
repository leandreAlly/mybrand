import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

const storeComment = async (req, res) => {
  try {
    console.log(req.params);
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog)
      return res.status(204).json({ message: "Can't find blog with given Id" });

    const comment = new Comment({
      name: req.body.name,
      content: req.body.name,
      blog: blog,
    });

    await comment.save();

    return res.status(201).json({ comment: comment });
  } catch (error) {
    res.status(500).json({ error: "something Went wrong...!" });
  }
};

const getCommentsPerPost = async (req, res) => {
  try {
    const comment = await Comment.find({
      blog: mongoose.Types.ObjectId(req.params.id),
    }).select("name content -_id");
    //   console.log(comment);
    if (!comment)
      return res
        .status(204)
        .json({ message: "Can't find comment with given Blog id" });

    return res.status(200).json({ comment: comment });
  } catch (error) {
    res.status(500).json({ error: "something Went wrong...!" });
  }
};

export { storeComment, getCommentsPerPost };
