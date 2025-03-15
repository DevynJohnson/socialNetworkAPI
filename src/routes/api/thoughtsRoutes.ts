import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';
import { Router } from 'express';

const router = Router();

router.route('/')
    .get(getAllThoughts)
    .post(createThought);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions/')
    .post(createReaction);
    

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);   

export default router;