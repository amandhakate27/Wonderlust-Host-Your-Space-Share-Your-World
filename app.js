if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// ROUTES
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// PORT
const port = process.env.PORT || 8080;

// ================= DATABASE =================

const dbUrl = process.env.ATLAS_DB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.log(" DB connection established");
    })
    .catch((err) => {
        console.log("DB connection error:", err);
    });

// ================= VIEW ENGINE =================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ================= MIDDLEWARE =================

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ================= SESSION STORE =================

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", function (err) {
    console.log(" SESSION STORE ERROR", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL LOCALS =================

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// ================= ROOT ROUTE FIX =================

app.get("/", (req, res) => {
    res.redirect("/listings");
});

// ================= MAIN ROUTES =================

app.use("/", userRouter);
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

// ================= 404 HANDLER =================

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
    let { status = 500 } = err;
    res.status(status).render("error.ejs", { err });
});

// ================= SERVER =================

app.listen(port, () => {
    console.log(` App is listening on port ${port}`);
});