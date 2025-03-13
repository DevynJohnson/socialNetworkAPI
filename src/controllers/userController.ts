import User from '../models/User.js';
import { Request, Response } from 'express';


// /api/users

// GET all users

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
            res.json(users);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
        }
    };

// GET one user by id with populated thought and friend data

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
            res.json(user);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// POST a new user

export const createUser = async (req: Request, res: Response) => {
    try {
        req.body = {username: req.body.username, email: req.body.email};
        const user = await User.create(req.body);
            res.json(user);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};


// PUT to update a user by id

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { username: req.body.username, email: req.body.email } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};


// DELETE to remove user by id

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

export const addFriend = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
};


// DELETE to remove a friend from a user's friend list

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
}