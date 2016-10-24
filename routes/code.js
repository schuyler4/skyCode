module.exports = function(app) {

  const code = require('../models/code.js');
  const user = require('../models/user.js');

  app.get('/newproject', function(request, response) {
    const loggedIn = request.session.loggedIn;
    const loggedInEmail = request.session.loggedInEmail;
    console.log(loggedIn);
    console.log(loggedInEmail)
    response.render('newproject');
  });

  app.post('/newproject', function(request, response) {
    const name = request.body.name;

    const loggedInEmail = request.session.email;
    const userPromise = user.findUser(loggedInEmail);

    userPromise.then(function(email) {
    const projectPromise =  code.createProject(email, name);
      projectPromise.then(function(project) {

        user.createProject("mareknewton@gmail.com", project);
        response.redirect('/' + email + '/' + project.name);
      });
    });
  });

  app.get('/:email/:project', function(request, response) {
    const email = request.params.email;
    const project = request.params.project;

    const userPromise = user.findUser(email);
    userPromise.then(function(user) {
      if(user) {
        const projectPromise = code.findProject(project);
        projectPromise.then(function(project) {
          if(project) {
            console.log(project.id);
            console.log("the project exists")
          } else {
            response.redirect('/');
          }
        });
      } else {
        console.log("no user");
      }
    });
  });

  app.get('/test', function(request, response) {
    const promise = code.findAll();
    promise.then(function(projects) {
      console.log(projects);
    });
  });

}
