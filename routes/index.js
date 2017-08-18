const express = require('express');
const router = express.Router();

let user = { username: 'pinkponies', password: 'pinkponiesyass'};

function checkmate(req, res, next) {
  if (req.session.token) {
    res.redirect('/results');
  }else{
    console.log('No token has been found');
    next();

  }
}

router.get('/', checkmate, function(req, res)  {
  res.render('login');

});
router.get('/results', function(req,res, next) {
  if (req.session.token) {
    next();
  }else{
    res.redirect('/')
  }
}, function(req, res) {
  res.render('results', req.session.user);

});

router.post('/results', function(req, res) {

  // VALIDATION ***************
  req.checkBody('username', "Your name cannot be empty.").notEmpty();
  req.checkBody('password', "Your password cannot be empty.").notEmpty();

  req.checkBody('password','Your password must be at least 8 characters!').len(8, 100);
  req.checkBody('username','Your username must have atleast 8 characters!d').len(8,25);

  let errors = req.getValidationResult();
  let messages = [];

  errors.then(function(result) {
    result.array().forEach(function(error) {
      messages.push(error.msg);
    });





  let obj = {
    errors:messages,
    username:req.body.username,
    password:req.body.password,
  }


  console.log(req.body);
  res.render('signup', obj);


  if (obj.username === user.username & obj.password ==user.password) {
    req.session.user = obj;
    req.session.token='abcde001';
    res.redirect('/results');
  }else{
    res.redirect('/');
  }

});
router.get('/logout', function(req,res){
  req.session.destroy(function(err) {
  console.log(err);
});
 res.redirect('/');
});
});
module.exports=router;
