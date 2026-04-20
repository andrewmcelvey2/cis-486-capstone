//app.mjs
//we are in ES6, use this.
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB via Mongoose
async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Connection failed', error);
    process.exit(1);
  }
}

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Reaction Challenge Pro',
    timestamp: new Date().toISOString()
  });
});

// start the server
run().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});