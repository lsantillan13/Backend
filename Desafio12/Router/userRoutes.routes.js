/*===== // =====*/
const express = require('express');
const router = express.Router();
const SignUpDAO = require('../Daos/Auth/SignUp');
const DAO  = new SignUpDAO();
/*================================ - DAO - ================================*/
router.post('/signup', (req, res) => { DAO.signUp(req, res); });
router.get('/signup', (req, res) => { res.send('<h1>hola</h1>'); });


module.exports = router;