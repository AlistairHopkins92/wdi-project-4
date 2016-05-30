var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var locationsController = require('../controllers/locationsController');

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

router.route('/users/:id/match')
  .post(locationsController.match);

module.exports = router;
