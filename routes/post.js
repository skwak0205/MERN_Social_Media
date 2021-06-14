const router = require('express').Router();
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
  likePost,
  getTimelinePosts,
} = require('../controllers/post');

// Create a post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// delete a post
router.delete('/:id', deletePost);

// like a post
router.put('/:id/like', likePost);

// get a post
router.get('/:id', getPost);

// get timeline posts
router.get('/timeline/all', getTimelinePosts);

module.exports = router;
