const { render } = require("ejs");
const Personnel = require("../models/medicalp");
const patient = require("../models/patient");
module.exports.renderLogin = (req, res) => {
    res.render('personnel/login');
}

module.exports.login =async (req, res) => {
  const m = req.session.passport.user;
  const personnel = await Personnel.find({username:m});
 if (!personnel) {
  console.log("here");
  res.status(500).json({error:'not found'})

}else{
      console.log("herebtw");
      console.log(personnel[0]);
      res.status(200).json(personnel[0])
      }
}
module.exports.getper = async (req, res,next) => {
  const med = await Personnel.findById(req.params.id);
  if (!med) {
    req.flash('error', 'Cannot find that patient!');
    res.status(500).send("not found")
}
res.status(200).json(med)
      
  }
  module.exports.getper = async (req, res,) => {
    console.log("herererere");
    const per = await Personnel.findById(req.params.id);
    if (!per) {
        req.flash('error', 'Cannot find that patient!');
        res.status(500).send("not found")
    }
    res.status(200).json(per)
}
