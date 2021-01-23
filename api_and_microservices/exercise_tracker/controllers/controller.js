const Mode = require('../models/info_schema'); 
const Ecer = require('../models/exercise_schema');
const Query = require('../models/query_schema');

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
      process.env.CURR_USER=req.body.username;
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
  exercise_data.date = exercise_data.date.setHours(exercise_data.date.getHours()+24);
  console.log(exercise_data);

  exercise_data.save()
    .then((result) => {
      res.render('index', { title: "Main page" });
    })
    .catch((err) => {
      console.log(err);
    });

};

const logout = (req, res, next) => {
  process.env.CURR_USER=null;
  res.render('login', { title: "Login Page" });
};

const log_page = (req, res, next) => {
  
  Ecer.find({ userId: process.env.CURR_USER }) 
    .then((result) => {
      let temp = result;
      temp.push(result.length);
      res.render('exercise_log', { title: "Exercise Logs", exercises: temp });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_logs = (req, res, next) => {
  const query_data = new Query(req.query);

  if (query_data.from == null && query_data.to == null) {
      Ecer.find({})
        .then((result) => {
          let temp = result;
          temp.push(result.length);
          res.render('exercise_log', { title: "Exercise Logs", exercises: temp });
        })
        .catch((err) => {
          console.log(err);
        });         

      } else {
         const from = query_data.from.setHours(query_data.from.getHours()+24);
         const to = query_data.to.setHours(query_data.to.getHours()+24);
      

         Ecer.find({
           userId: process.env.CURR_USER,
           date: {
             $gte: from,
             $lte: to
           }
         })
         .then((result) => {
           let temp = result;
           temp.push(query_data.limit);
           console.log(temp);
           res.render('exercise_log', { title: "Exercise Logs", exercises: temp });
         })
         .catch((err) => {
           console.log(err);
         });

  }
};

module.exports = {
    login_page,
    registration_page,
    add_account,
    login,
    add_exercise,
    add,
    logout,
    log_page,
    get_logs
};
