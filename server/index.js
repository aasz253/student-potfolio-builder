require('dotenv').config();
const express = require('express');
const cors = require('cors');
const portfolioRoutes = require('./routes/portfolio');
const githubRoutes = require('./routes/github');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/github', githubRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'AutoPortfolio Builder API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
