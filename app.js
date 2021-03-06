var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var server         = require("http").createServer(app);
var io             = require("socket.io")(server);

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  return res.sendFile(__dirname + "/public/index.html");
})

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

app.use(assignUser);

/*
 * Assign user from the JWT token payload
 */
function assignUser(req, res, next) {
  if (req.user) {
    User
    .findById({ _id: req.user._doc._id })
    .then(function(user) {
      if (!user) return res.status(401).json({message: 'No user found'});
      req.user = user;
      next();
    })
    .catch(function(err){
      return res.status(401).json({message: 'No user found'});
    });
  } else {
    next();
  }
}

var routes = require('./config/routes');
app.use("/api", routes);

server.listen(config.port, function(){

  io.on('connect', function(socket) {
    socket.on("join", function(room) {
      console.log("Joined", room);
      socket.join(room);
    })

    socket.on("send", function(data){
      console.log(data);
      io.in(data.channel).emit("receive", data);
    })
  });

});
