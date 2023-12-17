const Document = require('../models/docModel');
const mongoose = require('mongoose');

// get all users
const getAllUsers = async (req, res) => {
    const users = await Document.find({}).sort({createdAt: -1});
    res.status(200).json(users);
};

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await Document.findById(id);
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    }
    res.status(200).json(user);
};


// create new user
const create = async (req, res) => {
    const {name, lName, phone} = req.body;
    
    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!lName) {
        emptyFields.push('lName');
    }
    if (!phone) {
        emptyFields.push('phone')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const document = await Document.create({name, lName, phone});
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await Document.findByIdAndDelete({_id: id});
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    } 
    res.status(200).json(user);
}
// update a user
const update = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await Document.findByIdAndUpdate({_id: id}, {...req.body});
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    }   
    res.status(200).json(user);
}
module.exports = {
    getAllUsers, 
    getUser, 
    create,
    deleteUser,
    update
}
    