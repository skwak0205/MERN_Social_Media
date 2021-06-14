const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// Update User
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('회원 정보가 업데이트 되었습니다.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('본인 계정이 아닙니다.');
  }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('계정이 삭제 되었습니다.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('본인 계정만 삭제 가능합니다.');
  }
});

// Get a User
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Follow a User
const followUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json('팔로우 하였습니다.');
      } else {
        res.status(403).json('이미 팔로우하였습니다.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('본인을 팔로우 할 수 없습니다.');
  }
});

// Unfollow a User
const unfollowUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json('팔로우를 취소하였습니다.');
      } else {
        res.status(403).json('팔로우하지 않는 회원입니다.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('본인을 팔로우 취소 할 수 없습니다.');
  }
});

module.exports = { updateUser, deleteUser, getUser, followUser, unfollowUser };
