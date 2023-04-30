import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';
import chatRoutes from './routes/chat.routes.js';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }))

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/chat/completions", chatRoutes);
app.get('/', (req, res) => {
  console.log("logs started")
  res.status(200).json({ message: "Hello from DALL.E" })
})

app.listen(port, () => console.log(`Server has started on port ${port}`))