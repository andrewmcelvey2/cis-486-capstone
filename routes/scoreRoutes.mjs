// routes/scoreRoutes.mjs
import express from 'express';
import { createScore, getScores, updateScore, deleteScore } from '../controllers/scoreController.mjs';
import { authenticateToken } from '../middleware/auth.mjs';

const router = express.Router();

router.post('/', authenticateToken, createScore);
router.get('/', getScores);
router.put('/:id', authenticateToken, updateScore);
router.delete('/:id', authenticateToken, deleteScore);

export default router;