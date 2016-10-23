module.exports = function(app) {
  app.get('/', function(request, response) {
    const loggedIn = request.session.loggedIn;
    console.log(loggedIn);
    response.render('home', {loggedIn: loggedIn});
  });
}
