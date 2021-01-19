const Mode = require('../models/info_schema'); 
const Ecer = require('../models/exercise_schema');

const login_page = (req, res, next) => {
  res.render('login', { title: "Login Page" });
};

const registration_page = (req, res, next) => {
  res.render('registration', { title: "Registration page" })};

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

const login = (req, res, next) => {
  const credentials = req.body;
  console.log(req.body);
  
  Mode.findOne(credentials)
    .then((result) => {
      console.log(result);
      if (result != null) {
        res.render('index', { title: "Main page", exercises: Mode });
      } else {
        res.redirect('/api/exercise/login_page');
      }
    })
    .catch((err) => {
      console.log(err);
    });

};

const add_exercise = (req, res, next) => {
  res.render('add_exercise', { title: "Add Exercise" });
};

const add = (req, res, next) => {
  const exercise_data = new Ecer(req.body);

  exercise_data.save()
    .then((result) => {
      res.render('index', { title: "Main page" });
    })
    .catch((err) => {
      console.log(err);
    });

};

const logout = (req, res, next) => {
  res.render('login', { title: "Login Page" });
};

module.exports = {
    login_page,
    registration_page,
    add_account,
    login,
    add_exercise,
    add,
    logout
};
