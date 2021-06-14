const router = require('express').Router();
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require('../controllers/post');

// Create a post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// delete a post
router.delete('/:id', deletePost);

router.get('/:id', getPost);

module.exports = router;
