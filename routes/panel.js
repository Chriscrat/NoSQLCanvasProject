var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('panel', { title: 'Panel' });
});

module.exports = router;
