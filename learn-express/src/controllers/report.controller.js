import Blog from "../models/Blog";
import Comment from "../models/Comment";
import Queries from "../models/Queries";

const adminReport = async (req, res) => {
  const blogs = await Blog.countDocuments();
  const queries = await Queries.countDocuments();
  const comments = await Comment.countDocuments();

  const group = await Blog.aggregate([
    {
      $group: {
        _id: null,
        likes: { $sum: "$likes" },
      },
    },
  ]);

  res.status(200).json({
    message: "admin reports",
    blogs: blogs,
    queries: queries,
    comments: comments,
    likes: group[0].likes,
  });
};

export default adminReport;
