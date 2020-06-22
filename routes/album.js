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

router.post('/add', tokenVerification, (req, res) => {

});

module.exports = router;
