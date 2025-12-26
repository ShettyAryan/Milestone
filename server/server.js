import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { calendarRouter } from './routes/calendar.js';
import { sheetsRouter } from './routes/sheets.js';

// Load environment variables
// In production, Leapcell sets env vars directly, so .env files are optional
if (process.env.NODE_ENV !== 'production') {
  // Only load .env files in development
  dotenv.config({ path: '.env.local' });
  dotenv.config(); // This will override with .env if it exists
}

const app = express();
const PORT = process.env.PORT || 8080;

// Health check endpoint (for deployment platforms)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Milestones Clinic Backend API' });
});

// CORS configuration
const corsOptions = {
  origin: true,
  // origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Routes
app.use('/api/calendar', calendarRouter);
app.use('/api/sheets', sheetsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, "0.0.0.0", () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Health check available at /health`);
  } else {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
  }
});

