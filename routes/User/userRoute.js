const user = require('../../controllers/User/userController');
const auth = require('../../controllers/User/authController');
module.exports = (app) => {
    // app.route('/user/getlist').get(auth.isAuthenticated, user.getList);
    app.route('/user/getlist').get(user.getList);
    app.route('/user/getinfo').get(auth.isAuthenticated, user.getInfo);
    app.route('/user/getbyrole').get(auth.isAuthenticated, user.getByRole);

    app.route('/user/register').post(auth.isAuthenticated, user.register);
    app.route('/user/login').post(user.login);
    app.route('/user/changepass').post(auth.isAuthenticated, user.changePass);
    app.route('/user/delete').post(auth.isAuthenticated, user.deleteUser);
}