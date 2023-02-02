import mongoose from "mongoose";

const schema = mongoose.Schema;

const BlogSchema = new schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  picture: String,
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
