const express = require('express');
const apiController = require('../controllers/controller');

const router = express.Router();

router.get('/login_page', apiController.login_page);
router.get('/register', apiController.registration_page);
router.post('/addAccount', apiController.add_account);
router.post('/login', apiController.login);
router.get('/add_exercise', apiController.add_exercise);
router.post('/add', apiController.add);
router.get('/logout', apiController.logout);

module.exports = router;

