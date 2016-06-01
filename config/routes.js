var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var locationsController = require('../controllers/locationsController');
var connectionsController = require('../controllers/connectionsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/locations')
  .post(locationsController.create);
router.route('/locations/:id')
  .get(locationsController.show);

router.route('/connections')
  .post(connectionsController.create);

router.route('/matches')
  .post(connectionsController.index);

// router.route('/users/:id/matches/:matchid/save')
//   .get(usersController.match);

module.exports = router;
