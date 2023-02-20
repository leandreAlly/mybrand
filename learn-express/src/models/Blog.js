import mongoose from "mongoose";

const schema = mongoose.Schema;

const BlogSchema = new schema({
  blogTitle: { type: String, required: true },
  blogContent: { type: String, required: true },
  blogImage: { type: String },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectID, ref: "Comment" }],
  commentsCount: { type: Number, default: 0 },
  likedBy: [{ type: String }],
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
