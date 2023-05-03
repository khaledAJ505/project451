const { render } = require("ejs");
const Personnel = require("../models/medicalp");
const patient = require("../models/patient");
const admin = require("../models/admin");
module.exports.renderLogin = (req, res) => {
    res.render('admin/login');
}

module.exports.login = async(req, res) => {

    const a = req.session.passport.user;
  const ad = await admin.find({username:a});
 if (!ad) {
  console.log("here");
  res.status(500).json({error:'not found'})

}else{
      console.log("herebtw");
      console.log(ad[0]);
      res.status(200).json(ad[0])
      }
}

