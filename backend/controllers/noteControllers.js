const Note = require('../models/noteModel');
const mongoose = require('mongoose');

// get all notes
const getAllNotes = async (req, res) => {
    const user_id = req.user._id

    const notes = await Note.find({ user_id }).sort({createdAt: -1});
    res.status(200).json(notes);
};

// get a single note
const getNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal note id.'});   
    };
    const note = await Note.findById(id);
    if (!note) {
        return res.status(400).json({error: 'No such note in DB'})
    }
    res.status(200).json(note);
};


// create new note
const createNote = async (req, res) => {
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
        const user_id = req.user._id;
        const newNote = await Note.create({name, lName, phone, user_id});
        res.status(200).json(newNote);

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal note id.'});   
    };
    const note = await Note.findByIdAndDelete({_id: id});
    if (!note) {
        return res.status(400).json({error: 'No such note in DB'})
    } 
    res.status(200).json(note);
}

// update a user
const updateNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal note id.'});   
    };
    const note = await Note.findByIdAndUpdate({_id: id}, {...req.body});
    if (!note) {
        return res.status(400).json({error: 'No such note in DB'})
    }   
    res.status(200).json(note);
}

module.exports = {
    getAllNotes, 
    getNote, 
    createNote,
    deleteNote,
    updateNote
}
    