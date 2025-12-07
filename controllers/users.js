
const User = require('../models/user.js');

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to WonderLust!');
            const redirectUrl = req.session.returnUrl || '/listings';
            delete req.session.returnUrl;
            res.redirect(redirectUrl);
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
};


module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login = async(req,res,next)=>{
    req.flash("success", "Logged in successfully");
    
    res.redirect(res.locals.redirectUrl || "/listings");
}


module.exports.logout = (req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}