var express = require('express');
var router = express.Router();
const path = require("path")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.version });
});
/* GET home page. */
router.get('/menu/:origin/:book', function(req, res, next) {
  // console.log('touch')
  res.sendFile(path.resolve(__dirname,"../public/index.html"))
  // res.render('index', { title: 'Express' });
});
router.get('/detail/:origin/:book', function(req, res, next) {
  // console.log('touch')
  res.sendFile(path.resolve(__dirname,"../public/index.html"))
  // res.render('index', { title: 'Express' });
});
router.get('/search/:origin/:book', function(req, res, next) {
  // console.log('touch')
  res.sendFile(path.resolve(__dirname,"../public/index.html"))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
