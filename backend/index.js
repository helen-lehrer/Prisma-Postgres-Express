const express = require("express");
const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient();
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

app.use(express.json());

app.post('/job', async (req, res) => {
  const job = await prisma.job.create({ data: req.body });
  res.json(job);
});

app.get('/', async (req, res) => {
  const job = await prisma.job.findMany();
  res.json(job);
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});

