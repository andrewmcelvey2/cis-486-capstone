// controllers/scoresController.mjs
import Score from '../models/score.mjs';

// CREATE
export const createScore = async (req, res) => {
  try {
    const { playerName, score } = req.body;

    if (!playerName || score === undefined) {
      return res.status(400).json({ error: 'playerName and score are required' });
    }

    const newScore = await Score.create({
      userId: req.user.userId,
      playerName,
      score: Number(score)
    });

    res.status(201).json({
      message: 'Score saved successfully',
      id: newScore._id
    });
  } catch (error) {
    console.error('Error creating score:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
};

// READ
export const getScores = async (req, res) => {
  try {
    const scores = await Score.find({}).sort({ score: -1, createdAt: 1 });
    res.json(scores);
  } catch (error) {
    console.error('Error reading scores:', error);
    res.status(500).json({ error: 'Failed to get scores' });
  }
};

// UPDATE
export const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerName, score } = req.body;

    const updateFields = {};
    if (playerName !== undefined) updateFields.playerName = playerName;
    if (score !== undefined) updateFields.score = Number(score);

    const result = await Score.findByIdAndUpdate(id, updateFields);

    if (!result) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ error: 'Failed to update score' });
  }
};

// DELETE
export const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    console.error('Error deleting score:', error);
    res.status(500).json({ error: 'Failed to delete score' });
  }
};