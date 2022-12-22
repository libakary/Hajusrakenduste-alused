const widgets = require("../controllers/widgetsController")

module.exports = (app) => {
    app.route('/widgets')
                .get(widgets.getAll)
                .post(widgets.create)
    app.route('/widgets/:id')
                .get(widgets.getById)
                .put(widgets.update)
                .delete(widgets.delete)
}