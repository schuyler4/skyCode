const bcrypt = require('bcrypt-nodejs');
const user = require('../models/user.js');

module.exports = function(app) {

  app.get('/signup', function(request, response) {
    response.render('signup');
  });

  app.post('/signup', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    const newUser = user.create(email, password);
    if(newUser) {
      request.session.loggedIn = true;
      request.session.email = email;
      console.log(request.session.loggedIn);
      console.log(request.session.email);
      response.redirect('/');
    } else {
      response.redirect('/signup');
    }
  });

  app.get('/login', function(request, response) {
    response.render('login');
  });

  app.post('/login', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    const promise = user.login(email);
    promise.then(function(user) {
      console.log(user)
      if(user) {
        response.redirect('/' + user.email);
      } else {
        response.redirect('/signup');
      }
    })
  });

  app.get('/:email', function(request, response) {
    const user = request.params.email;
    const promise = user.findOne(user);
    promise.then(function(user) {
      console.log(user);
    });
  });
}
