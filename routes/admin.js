const express = require('express');
const router = express.Router();
const passport = require('passport');
admin = require('../controllers/admin');


router.route('/loginp')
    .post(passport.authenticate('admin', { failureFlash: true, failureRedirect: '/admin/loginp' }), admin.login)


module.exports = router;