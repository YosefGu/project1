const express = require('express');

// controllers function 
const {getAllUsers, getUser, create, deleteUser, update} = 
require('../controllers/routesControllers')

const router = express.Router();

// GET all users
router.get('/', getAllUsers);
  
// GET a single user
router.get('/:id', getUser);

//POST a new user
router.post('/', create);

//DELETE a user
router.delete('/:id', deleteUser);

//UPDATE a user
router.patch('/:id', update);

module.exports = router;