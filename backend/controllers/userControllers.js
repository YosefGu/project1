const User = require('../models/userModel');

// login user 
const loginUser = async (req, res) => {
    res.json({mass: 'login user' })
};

// signup user 
const signupUser = async (req, res) => {
    res.json({mass: 'signup user' })
};

module.exports = { loginUser, signupUser}
