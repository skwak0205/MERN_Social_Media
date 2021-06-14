const router = require('express').Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require('../controllers/user');

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/', getUser);

router.put('/:id/follow', followUser);

router.put('/:id/unfollow', unfollowUser);

module.exports = router;
