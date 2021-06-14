const router = require('express').Router();
const { updateUser, deleteUser, getUser } = require('../controllers/user');

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.get('/', getUser);

module.exports = router;
