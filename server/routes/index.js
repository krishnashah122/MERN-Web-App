const express = require('express');
const router = express.Router();

// Controllers
const registerController = require('../controllers/register_controller');
const loginController = require('../controllers/login_controller');
const contactController = require('../controllers/contact_controller');

// Middleware
const isAuthenticated = require('../middlewares/authenticate');

router.get('/', (req, res) => {
    res.send(`Hello World from the server.`);
});

router.get('/about', isAuthenticated, (req, res) => {
    res.send(req.rootUser);
});

router.post('/contact', isAuthenticated, contactController.contact);

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send('User Logout!');
});

router.get('/getData', isAuthenticated, (req, res) => {
    res.send(req.rootUser);
});

module.exports = router;