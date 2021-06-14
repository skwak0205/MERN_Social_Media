const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

// Create a post
const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById('60c6ea4d9e86b31e5009ba14');

    if (post.userId.equals(req.body.userId)) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('포스트가 업데이트 되었습니다.');
    } else {
      res.status(403).json('본인 포스트만 업데이트 가능합니다.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId.equals(req.body.userId)) {
      await post.deleteOne();
      res.status(200).json('포스트가 삭제되었습니다.');
    } else {
      res.status(403).json('본인의 포스트만 삭제 가능합니다.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like a post
const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('좋아요를 눌렀습니다.');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('좋아요를 취소했습니다.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get timeline posts
const getTimelinePosts = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  likePost,
  getTimelinePosts,
};
