const isAdmin = (req, res, next) => {
if (req.body.isAdmin) {
    next();
} else {
    res.status(403).send('Lo siento, no eres Admin');
}
}

module.exports = isAdmin;