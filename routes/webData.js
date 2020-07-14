const router = require('express').Router();


router.get('/', (req, res) => {
  res.json({
    webData: {
      testApi: 'Test Api',
    }
  });
});

module.exports = router;
