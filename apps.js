const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs');
const session = require('express-session');
const flash = require('connect-flash');
const passport1 = require('passport');



const passport2 = require('passport');
const passport3 = require('passport')
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');

const patient = require('./models/patient');
const personnel = require ('./models/medicalp')
const admin = require ('./models/admin')

const patientRoutes = require('./routes/patient');
const personnelRoutes = require('./routes/personnel');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.port || 3000;
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const sessionConfig = {
    secret: 'secret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport2.initialize());
app.use(passport2.session());
passport2.use('patient',new LocalStrategy(patient.authenticate()));
passport2.serializeUser(patient.serializeUser());
passport2.deserializeUser(patient.deserializeUser());

app.use(passport1.initialize());
app.use(passport1.session());
passport1.use('personnel',new LocalStrategy(personnel.authenticate()));
passport1.serializeUser(personnel.serializeUser());
passport1.deserializeUser(personnel.deserializeUser());

app.use(passport3.initialize());
app.use(passport3.session());
passport3.use('admin',new LocalStrategy(admin.authenticate()));
passport3.serializeUser(admin.serializeUser());
passport3.deserializeUser(admin.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.get('/loginoptions', (req, res) => {
    res.render('loginoptions')
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', patientRoutes)
app.use('/med', personnelRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
    res.render('home')
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port = process.env.PORT  || 3000;
app.listen(port, () => {
    console.log('Serving on port 3000')
})