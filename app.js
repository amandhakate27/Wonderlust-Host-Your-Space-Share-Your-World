
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
console.log(process.env.SECRET);

const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

// ROUTES
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// PORT
let port = 8080;

// EJS CONFIG
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.engine('ejs', ejsMate);


// STATIC + BODY PARSER + METHOD OVERRIDE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

const dbUrl = process.env.ATLAS_DB_URL; // for mongodb atlas

// MONGODB CONNECTION
async function main(){
    await mongoose.connect(dbUrl);
}
main().then((res)=>{
    console.log("DB connection established");
}).catch((err)=>{
    console.log("Error: " , err);
});

// MONGODB STORE FOR SESSIONS
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET ,
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR" , e);
});

// SESSION CONFIG
const sessionOptions = {
    store ,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
}



// SESSION + FLASH

app.use(session(sessionOptions)); // session middleware
app.post("/login", (req, res, next) => {
    console.log("BODY:", req.body);
    next();
});

app.use(flash()); // flash middleware

// PASSPORT INIT
app.use(passport.initialize()); // passport initialization
app.use(passport.session()); // passport session handling 
passport.use(new LocalStrategy(User.authenticate())); // using local strategy for authentication 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//  GLOBAL RES.LOCALS (FLASH + CURRENT USER)
app.use((req,res,next)=>{ // custom middleware to pass flash messages to all templates
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // res.locals.currentUser = req.user;
    // console.log(res.locals.success);
    res.locals.currentUser = req.user;
    next();
});


// HOME ROUTE
// app.get("/", (req,res)=>{
//     res.send("Home Page");
// })

// app.get("/demouser" , async (req,res)=>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta_student", // username field is added by passport-local-mongoose plugin
//     });
//     const registeredUser = await User.register(fakeUser , "helloworld");
//     res.send(registeredUser);
// });

// MAIN ROUTES
app.use("/", userRouter); // to handle root route redirection to /listings  
app.use("/listings", listingRouter); // to handle root route redirection to /listings
app.use("/listings/:id/reviews", reviewRouter); // to handle root route redirection to /listings

// 404 HANDLER
app.use((req,res,next)=>{
    next(new ExpressError(404, "Page Not Found"));
});

// ERROR HANDLER
app.use((err, req,res, next)=>{
   let {status = 500 , message = "ERROR ---- Something went wrong"} = err;
//    res.status(status).send(message);
res.status(status).render("error.ejs" , {err });
})

// SERVER
app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
