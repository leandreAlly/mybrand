import Blog from "../models/Blog.js";
// import upload from "../services/multer.js";
import cloudinary from "../services/cloudinary.js";

// Get all blogs
const getAllBlog = async (req, res) => {
  try {
    const blogList = await Blog.find().select("-likedBy");
    return res.status(200).json({ blogs: blogList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Submit a blog
const postBlog = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const post = new Blog({
      blogTitle: req.body.blogTitle,
      blogContent: req.body.blogContent,
      blogImage: result.secure_url,
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
    res.status(404).json({ message: "Something went wrong..!" });
  }
};

const updateBlog = async (req, res) => {
  let result;
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.blogTitle) {
      blog.blogTitle = req.body.blogTitle;
    }

    if (req.body.blogContent) {
      blog.blogContent = req.body.blogContent;
    }

    if (req.file) {
      result = await cloudinary.uploader
        .upload(req.file.path)
        .catch((error) => {
          throw error;
        });
      blog.blogImage = result.secure_url;
    }

    await blog.save();
    res.status(200).json({ Post: blog });
  } catch (error) {
    console.error(error);
    res.status().json({ message: "Something went wrong!" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "blog deleted" });
  } catch (error) {
    res.status(404).json({ message: "Post doesn't exist!" });
  }
};

export { getAllBlog, postBlog, getSingleBlog, updateBlog, deleteBlog };
