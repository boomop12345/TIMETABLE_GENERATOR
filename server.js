require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// --- Global Settings ---
// Essential for rate limiting to work correctly on local machines and behind proxies
app.set('trust proxy', 1);

// --- Rate Limiting Configurations ---

// General limiter: applies to all requests (Lowered to 5 for testing)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Change this back to 100 after you confirm it works
  standardHeaders: true, 
  legacyHeaders: false,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Stricter limiter for Auth: prevents brute force
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 25, // Limit each IP to 10 login attempts per hour
  message: { message: 'Too many login attempts, please try again in an hour' },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Middleware ---

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Apply general rate limiting BEFORE static files and routes
app.use(generalLimiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const errorHandler = require('./middleware/error');

// --- Routes ---

// Apply the stricter limiter specifically to auth routes
app.use('/api/auth', authLimiter, require('./routes/auth'));

app.use('/api/timetable', require('./routes/timetable'));

// Serve login page as default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loginpage.html'));
});

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});