const express = require('express');
const apiController = require('../controllers/controller');

const router = express.Router();

router.get('/login', apiController.login_page);
router.get('/register', apiController.registration_page);
router.post('/addAccount', apiController.add_account);

module.exports = router;

