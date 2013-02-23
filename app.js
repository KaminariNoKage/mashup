
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(process.env.SECRET || 'fake_secret'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '437638809645567', secret: '95eb8bcd4b89b858d87c72383815c8b9' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/vitube');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
      if (!user || err){
        res.redirect('/login');
      } else {
        req.user = user;
        next();
      }
    });
  }
}

app.get('/', facebookGetUser(), routes.index);
app.get('/login', Facebook.loginRequired(), user.login);
app.get('/new_project', facebookGetUser(), user.newproj);
app.get('/myproject/:project', facebookGetUser(), user.projpage);
app.get('/project/:project', facebookGetUser(), user.visit);

app.post('/project/make', user.makenewproj);
app.post('/add_image', user.addimg);
app.post('/project/edit', user.projedit);
app.post('/project/delete/project', user.deleteproj);
app.post('/project/delete/image', user.deleteimg);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
