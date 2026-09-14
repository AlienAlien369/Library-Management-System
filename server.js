require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');
var passport = require('passport');
// var authenticate = require('./authenticate');


// Loading routers
const bookRouter = require('./routes/api/bookRouter');
const userRouter = require('./routes/api/userRouter');
const issueRouter = require('./routes/api/issueRouter');
const app= express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not set. Add it to your .env file (local) or your host\'s environment variables (Render).');
  process.exit(1);
}

// Connect to mongo
mongoose.connect(mongoURI)
.then(()=> {console.log("MongoDB Connected");})
.catch(err => console.log(err));

app.use(passport.initialize());

// Use routes
app.use('/api/books',bookRouter);
app.use('/api/users',userRouter);
app.use('/api/issues',issueRouter);

// Serve static assets if in production and a client build is actually present
// (this app is normally deployed as two separate services - the client on Vercel
// and this API on Render - so client/build usually won't exist here)
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.resolve(__dirname, 'client', 'build');
    if (require('fs').existsSync(clientBuildPath)) {
      app.use(express.static(clientBuildPath));

      app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
      });
    }
}

// Basic health check for uptime monitors / Render
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Fallback error handler so failures return JSON instead of hanging/crashing
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started running on port ${port}`));
