const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('이미 존재하는 회원입니다.');
  }

  try {
    // generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error('이메일 혹은 비밀번호가 틀렸습니다.');
  }

  //   try {
  //     const user = await User.findOne({ email });
  //     !user && res.status(404).send('user not found');

  //     const validPassword = await bcrypt.compare(
  //       req.body.password,
  //       user.password
  //     );

  //     !validPassword && res.status(400).json('wrong password');

  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});

module.exports = { registerUser, login };
