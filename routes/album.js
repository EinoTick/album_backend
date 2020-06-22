const router = require('express').Router();
const tokenVerification = require('./protectedRoutes');

router.get('/', tokenVerification, (req, res) => {
  res.json({
    album: {
      picture: 'pic',
      url: 'no'
    }
  });
});

module.exports = router;
