import express = require('express');
const router = express.Router();
import jwtAuthenticate from '../middlewares/passport';

import login from '../controllers/user/login';
import register from '../controllers/user/register';
// import signup = require('../controllers/user/signup');
// import logout = require('../controllers/user/logout');
// import getCurrentUser = require('../controllers/user/getCurrentUser');

router.post('/signup', register);
router.post('/login', login);
// router.post('/logout', jwtAuthenticate, logout);
// router.get('/getCurrentUser', jwtAuthenticate, getCurrentUser);

export default router;
