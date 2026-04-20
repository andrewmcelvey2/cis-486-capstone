// models/Score.mjs
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Score', scoreSchema);