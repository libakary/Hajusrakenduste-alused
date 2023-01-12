const greetings = require("../controllers/greetingsController")

module.exports = (app) => {
    app.route('/greetings')
                .get(greetings.getAll)
                .post(greetings.create)
    app.route('/greetings/:id')
                .get(greetings.getById)
                .put(greetings.update)
                .delete(greetings.delete)
}