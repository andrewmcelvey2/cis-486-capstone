// routes/scoresRoutes.mjs
import express from 'express';
import { createScore, getScores, updateScore, deleteScore } from '../controllers/scoreController.mjs';

const router = express.Router();

router.post('/', createScore);
router.get('/', getScores);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

export default router;