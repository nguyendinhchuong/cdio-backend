const comment = require('../../controllers/OutcomeStandard/commentController');
const auth = require('../../controllers/User/authController');

module.exports = (app) => {
    app.route('/comment/get').get( comment.getComment);

    app.route('/comment/add').post(auth.isAuthenticated, comment.addNewComment);
    app.route('/comment/done').post(auth.isAuthenticated, comment.doneComment);
}