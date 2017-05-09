var express = require('express');
var router = express.Router();
const path = require("path")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/menu/:book', function(req, res, next) {
  // console.log('touch')
  res.sendFile(path.resolve(__dirname,"../public/index.html"))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
