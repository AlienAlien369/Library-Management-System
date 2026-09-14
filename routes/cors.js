const cors = require('cors');

// Local dev origins are always allowed. Add your deployed frontend origin(s)
// via the CLIENT_ORIGIN env var (comma-separated for multiple), e.g.
// CLIENT_ORIGIN=https://library-management-system-lakshyas-projects-c97e54f6.vercel.app
const envOrigins = (process.env.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
    ...envOrigins
];

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    var origin = req.header('Origin');
    if (!origin || whitelist.indexOf(origin) !== -1) {
        corsOptions = { origin: true, credentials: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
