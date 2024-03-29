import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const createPosts = async (req, res, next) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const fetchPosts = async (req, res, next) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id: _id } = req.params;

    const postMessage = await PostMessage.findById(_id);

    res.status(200).json(postMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post ID" });
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "No post found with that ID" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");
    await PostMessage.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post ID" });
    }

    const post = await PostMessage.findById(id);

    if (!post) {
      return res.status(404).json({ message: "No post found with that ID" });
    }

    const userLiked = post.likes.includes(req.userId);

    if (userLiked) {
      post.likes = post.likes.filter((userId) => userId !== req.userId);
    } else {
      post.likes.push(req.userId);
    }

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating post like", error: error.message });
  }
};
