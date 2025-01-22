const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(require('./autobusiness-cb367-firebase-adminsdk-kz42p-aa5802a0f5.json'))
});

module.exports = admin;