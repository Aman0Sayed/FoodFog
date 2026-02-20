const app = require('../index');

// Vercel (and other serverless builders) will call this exported function per request.
module.exports = (req, res) => {
  return app(req, res);
};
