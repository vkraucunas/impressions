function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    } else {
        return next();
    }
}


function loginRedirect(req, res, next) {
    if (!req.user) {
        return next();
    } else {
        return res.redirect('/');
    }
}

module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    loginRedirect: loginRedirect
};