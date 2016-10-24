const bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
  const user = require('../models/user.js');
  const code = require('../models/code.js');

  app.get('/signup', function(request, response) {
    response.render('signup');
  });

  app.post('/signup', function(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    const newUser = user.create(email, password);
    const alreadyLoggedIn = request.session.loggedIn;
    if(newUser && !alreadyLoggedIn) {
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
    const alreadyLoggedIn = request.session.loggedIn;
    console.log(alreadyLoggedIn)

    const promise = user.findUser(email);
    promise.then(function(user) {
      console.log(user)
      if(user && !alreadyLoggedIn) {
        console.log("panda");
        request.session.loggedIn = true;
        request.session.email = user.email;
        response.redirect('/' + user.email);
      } else {
        response.redirect('/signup');
      }
    })
  });

  app.get('/logout', function(request, response) {
    request.session.loggedIn = false;
    request.session.username = false;
    response.redirect('/');
  });

  app.get('/:email', function(request, response) {
    const email = request.params.email;
    const promise = user.findUser(email);
    const loggedInEmail = request.session.email;
    console.log(loggedInEmail);

    promise.then(function(user) {
      if(user && loggedInEmail == user.email) {

        var projectNames = [];

        /*for(let i = 0; i < user.projects.length; i++) {
          const promise = code.getProjectNameFromId(user.projects[i]);
          let name;
          promise.then(function(name) {
            console.log(name.promise);
          });
        }*/
        /*const names = user.projects(function(i){
          code.getProjectNameFromId(i);
        });
        console.log(names);*/

        const projectPromise = getProjectNameFromId(user.projects);
        projectPromise.then(function(user) {
          console.log(user);
        })

        response.render('profile')
      } else {
        response.redirect('/login');
      }
    });
  });
}
