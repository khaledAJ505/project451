const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const patients = require('../controllers/patient');
router.route('/register')
    .post(catchAsync(patients.register));

router.route('/login')
    .post(passport.authenticate('patient', { failureMessage: true, failureRedirect: '/login' }), patients.login)

router.route('/:id')
    .get(patients.showprofile)

router.route('/assign2/:id')
    .get(patients.assigntodose2)
router.get('/setv1taken/:id',patients.setv1taken)
router.get('/setv2taken/:id',patients.setv2taken)
router.get('/getpdf/:id',patients.pdfgen)


module.exports = router;