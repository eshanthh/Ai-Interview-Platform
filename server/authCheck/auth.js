const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Token missing");
    }

    token = token.split(" ")[1];

    try {
        let decode = jwt.verify(token, "hehehehehehehehehe");
        req.user = decode;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).send(err.message);
    }
};

module.exports = auth;