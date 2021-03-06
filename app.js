const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var auth = require('./verify');
var cors = require('cors');


const url = 'mongodb://localhost:27017/exchange';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

connect.then((db) => {
    console.log("Connected to Database. Server running on port: 5000");
}, (err) => { console.log(err); });

var indexRouter = require('./routes/index');
//var userRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var uploadRouter = require('./routes/upload');

var clientRouter = require('./routes/clients');
var requestRouter = require('./routes/requestevents');

var blogRouter = require('./routes/blogs');
var jobRouter = require('./routes/jobs');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: 'session-id',
    secret: 'mysessionkey',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
app.use('*', cors({
    origin: 'http://localhost:4000',
    credentials: true
}));
app.use('/', indexRouter);
//app.use(auth);
//app.use('/users', userRouter);
app.use('/events', eventsRouter);
app.use('/upload', uploadRouter);

app.use('/clients', clientRouter);
app.use('/requestevent', requestRouter);

app.use('/blogs', blogRouter);
app.use('/jobs', jobRouter);
module.exports = app;