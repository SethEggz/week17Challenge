import { User, Thought } from '../models/index.js';
//GET all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find().populate('username').populate('reactions');
        res.status(200).json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
};
//GET a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('username').populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error retrieving thought', error });
    }
};
//POST a new thought
export const createThought = async (req, res) => {
    try {
        const { thoughtText, username } = req.body;
        const newThought = await Thought.create({ thoughtText, username });
        await User.findOneAndUpdate({ username }, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
};
//PUT to update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const { thoughtText } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { thoughtText }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error updating thought', error });
    }
};
//DELETE a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        await User.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: thought._id } }, { new: true });
        return res.status(200).json({ message: 'Thought deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error deleting thought', error });
    }
};
