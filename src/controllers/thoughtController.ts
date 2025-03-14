import { Thought, User } from '../models/index.js';
import { Router, Request, Response } from 'express';
const router = Router();

// /api/thoughts

// GET all thoughts

export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
            res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
        }
    };

// GET one thought by id

export const getThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id })
            res.json(thought);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// POST a new thought

export const createThought = async (req: Request, res: Response) => {
    try {
        req.body = {thoughtText: req.body.thoughtText, username: req.body.username, user_id: req.body.user_id};
        const thought = await Thought.create(req.body);
        
        // Push the new thought to the associated user's thoughts array
        await User.findOneAndUpdate(
            { _id: req.body.user_id },
            { $push: { thoughts: thought._id } },
            { new: true }
        );

        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// PUT to update a thought by id

export const updateThought = async (req: Request, res: Response) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { thoughtText: req.body.thoughtText } },
            { new: true }
        );
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// DELETE to remove a thought by id

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.id });
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

export const createReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        );
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

// DELETE to remove a reaction by id

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        res.json(reaction);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    };
};

export default router;