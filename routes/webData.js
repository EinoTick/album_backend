const router = require('express').Router();
const tokenVerification = require('./protectedRoutes');


router.get('/', tokenVerification, (req, res) => {
  res.json({
    webData: {
      companyName: 'Company',
      slogan: 'don\'t be evil'
    }
  });
});

module.exports = router;
