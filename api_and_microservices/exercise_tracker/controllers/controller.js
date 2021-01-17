const Mode = require('../models/info'); 

const login_page = (req, res, next) => {
  res.render('login', { title: "Login Page" });
};

const registration_page = (req, res, next) => {
  res.render('registration', { title: "Registratin page" })};

const add_account = (req, res, next) => {
  const new_account = new Mode(req.body);

  new_account.save()
    .then((result) => {
      res.redirect('/api/exercise/login'); 
    })
    .catch((err) => {
      console.log(err); 
    });
};

module.exports = {
    login_page,
    registration_page,
    add_account
};
