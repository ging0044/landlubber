var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Landlubber' });
});

router.post('/', function(req, res, next) {
    if(req.body.object === 'page'){
      console.log('page');
      console.log(req.body);
    }
    else {
      console.log(req.body.object);
      console.log(req.body);
    }
});

module.exports = router;
