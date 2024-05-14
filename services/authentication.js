const JWT = require("jsonwebtoken");

const secret = "araweb120338";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
    };

    const token = JWT.sign(payload, secret);

    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secret);

    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
};
