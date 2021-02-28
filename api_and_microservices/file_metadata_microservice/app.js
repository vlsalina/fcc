var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
require('dotenv').config();

const mongoose = require('mongoose');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');

const conn = mongoose.createConnection(process.env.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


var storage = new GridFsStorage({
  url: process.env.dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage }); 

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});


var app = express();
app.listen(3000);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  gfs.find({})
    .toArray((err, files) => {
      if (err) console.log(err);
      console.log(files);
      res.render('index', { title: "File Metadata Microservice", files: files });
    });
});
app.get('/download/:file', (req, res, next) => {
  //console.log(req.query.filename);
  console.log(req.params.file);
  gfs.openDownloadStreamByName(req.params.file).pipe(fs.createWriteStream('./public/images/' + req.params.file));
  res.redirect('/');
});
app.post('/upload', upload.array('files', 100), (req, res, next) => {
  if (req.files) {
    console.log({ file: req.files });
    res.redirect('/');
  } else {
    console.log('Check logs!');
    res.redirect('/');
  }
});
app.get('/delete/:id/:filename', (req, res, next) => {
  console.log(req.params.filename);
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) {
      console.log(err);
    }
    fs.unlink('./public/images/' + req.params.filename, (err) => { 
      if (err) console.log(err);
      res.redirect('/');
    });
  });
});
app.get('/find', (req, res, next) => {
  gfs.find({ filename: req.query.filename })
    .toArray((err, files) => {
      if (!files[0] || files.length == 0) {
        return res.status(200).json({
          success: false,
          message: 'No files found'
        });
      }
      res.status(200).json({
        success: true,
        file: files[0]
      });
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
