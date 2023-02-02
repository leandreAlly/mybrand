import Blog from "../models/Blog.js";

// Get all blogs
const getAllBlog = async (req, res) => {
  try {
    const blogList = await Blog.find();
    return res.status(200).json({ blogs: blogList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Submit a blog
const postBlog = async (req, res) => {
  try {
    // const image = req.file.path
    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      // picture: imageUrl,
    });
    await post.save();

    res.status(201).json({ Post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });
    res.status(200).json({ Post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }
    // if (req.body.picture) {
    //   blog.picture = req.file.path;
    // }

    await blog.save();
    res.status(200).json({ Post: blog });
  } catch {
    res.status(404).json({ error: error.message });
    console.log(error.message);
  }
};
const deleteBlog = async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "blog deleted" });
  } catch (error) {
    res.status(404).json({ error: "Post doesn't exist!" });
  }
};

export { getAllBlog, postBlog, getSingleBlog, updateBlog, deleteBlog };
