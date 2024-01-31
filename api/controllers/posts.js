const Post = require("../models/post");
const User = require('../models/user');
const { generateToken } = require("../lib/token");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').select('message');
    // console.log(posts); // Add this line to log the posts to the console
    const token = generateToken(req.user_id);
    res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    // Fetch the user's information using req.user_id
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new post with the user's ID and username
    const newPost = new Post({
      message: req.body.message,
      user: user._id, // ObjectId of the user
      username: user.username // Username of the user
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getUserPosts  =  async(req,res) =>{
  try {
    // Fetch the user's information using req.user_id
    const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find posts by user's ID and username
    const findPosts = Post.find({user});

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getSinglePost = async (req, res) => {
  try {
    const userId = req.user_id; // or req.params.userId if you're getting the ID from the URL

    // Find posts by user's ID
    const userPosts = await Post.find({ user: userId }).populate('user', 'username');
    console.log(userPosts)
    if (!userPosts.length) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json({ posts: userPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deletePost = async (req, res) => {
  try {
    // Extract post ID from request parameters
    const postId = req.params.postId;
    console.log("Post ID:", postId); // Log the Post ID

    // Fetch the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log("Post:", post); // Log the Post object

    // Log the user ID for debugging
    console.log("User ID from request:", req.user_id);

    // Check if the user making the request is the owner of the post
    if (post.user.toString() !== req.user_id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  getUserPosts: getUserPosts,
  getSinglePost: getSinglePost,
  deletePost:deletePost
};

module.exports = PostsController;
