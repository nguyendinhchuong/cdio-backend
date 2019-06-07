const user = require('../../controllers/User/userController');
const auth = require('../../controllers/User/authController');
module.exports = (app) => {
    // app.route('/user/getlist').get(auth.isAuthenticated, user.getList);
    app.route('/user/getlist').get(user.getList);
    app.route('/user/getinfo').get(auth.authenRole, auth.isAuthenticated, user.getInfo);
    app.route('/user/getbyrole').get(auth.authenRole,auth.isAuthenticated, user.getByRole);

    app.route('/user/register').post(auth.authenRole,auth.isAuthenticated, user.register);
    app.route('/user/registerlist').post(auth.authenRole,auth.isAuthenticated, user.registerList);
    app.route('/user/login').post(user.login);
    app.route('/user/changepass').post(user.changePass);
    app.route('/user/delete').post(auth.authenRole,auth.isAuthenticated, user.deleteUser);
}