const express = require('express');
const router = express.Router();
const passport = require('passport');
const personnel = require('../controllers/medicalp');

const patient = require('../models/patient');

router.route('/loginp')
    .get(personnel.renderLogin)
    .post(passport.authenticate('personnel', { failureFlash: true, failureRedirect: '/med/loginp' }), personnel.login)

router.get('/:id',personnel.getper);
module.exports = router;