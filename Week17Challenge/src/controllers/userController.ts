import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';


/**
 * GET All Users /
 * @returns an array of User objects
*/
export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}
/**
 * GET a User by ID /Users/:id
 * @param id - the id of the course to get
 * @returns a user object
*/
export const getUserById = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * POST a new User /
 * @param user- the user to create
 * @returns the created user object
*/
export const createUser = async(req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * PUT to update a User by ID /Users/:id
 * @param id - the id of the course to update
 * @returns the updated user object
*/
export const updateUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * DELETE a User by ID /Users/:id
 * @param id - the id of the course to delete
 * @returns a message indicating success or failure
*/
export const deleteUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully' });
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * POST to add a friend to a User's friend list /Users/:userId/friends/:friendId
 * @param userId - the id of the user to add a friend to
 * @param friendId - the id of the friend to add
 * @returns the updated user object
*/
export const addFriend = async(req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User
            .findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * DELETE to remove a friend from a User's friend list /Users/:userId/friends/:friendId
 * @param userId - the id of the user to remove a friend from
 * @param friendId - the id of the friend to remove
 * @returns the updated user object
*/
export const removeFriend = async(req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User
            .findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * POST to add a thought to a User's thought list /Users/:userId/thoughts/:thoughtId
 * @param userId - the id of the user to add a thought to
 * @param thoughtId - the id of the thought to add
 * @returns the updated user object
*/
export const addThought = async(req: Request, res: Response) => {
    try {
        const { userId, thoughtId } = req.params;
        const user = await User
            .findByIdAndUpdate(userId, { $addToSet: { thoughts: thoughtId } }, { new: true })
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * DELETE to remove a thought from a User's thought list /Users/:userId/thoughts/:thoughtId
 * @param userId - the id of the user to remove a thought from
 * @param thoughtId - the id of the thought to remove
 * @returns the updated user object
*/
export const removeThought = async(req: Request, res: Response) => {
    try {
        const { userId, thoughtId } = req.params;
        const user = await User
            .findByIdAndUpdate(userId, { $pull: { thoughts: thoughtId } }, { new: true })
            .populate('friends')
            .populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * POST to create a thought and add it to a user's thought list /Users/:userId/thoughts
 * @param userId - the id of the user to add a thought to
 * @param thought - the thought to create and add
 * @returns the created thought object
*/
export const createThought = async(req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { thoughtText, username } = req.body;
        const thought = await Thought.create({ thoughtText, username });
        await User.findByIdAndUpdate(userId, { $addToSet: { thoughts: thought._id } }, { new: true });
        return res.status(201).json(thought);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * POST to create a reaction and add it to a thought's reaction list /Users/:userId/thoughts/:thoughtId/reactions
 * @param thoughtId - the id of the thought to add a reaction to
 * @param reaction - the reaction to create and add
 * @returns the created reaction object
 * */
export const createReaction = async(req: Request, res: Response) => {
    try {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $addToSet: { reactions: { reactionBody, username } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(201).json(thought);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * DELETE to remove a reaction from a thought's reaction list /Users/:userId/thoughts/:thoughtId/reactions/:reactionId
 * @param thoughtId - the id of the thought to remove a reaction from
 * @param reactionId - the id of the reaction to remove
 * @returns the updated thought object
 * */
export const removeReaction = async(req: Request, res: Response) => {

    try {
        const { thoughtId, reactionId } = req.params;
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * DELETE to remove a thought from a user's thought list /Users/:userId/thoughts/:thoughtId
 * @param userId - the id of the user to remove a thought from
 * @param thoughtId - the id of the thought to remove
 * @returns the updated user object
*/
export const deleteThought = async(req: Request, res: Response) => {
    try {
        const { userId, thoughtId } = req.params;
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        const user = await User.findByIdAndUpdate(userId, { $pull: { thoughts: thoughtId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/** 
 * GET a User by username /Users/username/:username
 * @param username - the username of the user to get
 * @returns a user object
 * */
export const getUserByUsername = async(req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}
/**
 * GET a User by email /Users/email/:email
 * @param email - the email of the user to get
 * @returns a user object
 * */
export const getUserByEmail = async(req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const
        user = await User.findOne({ email }).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
}











