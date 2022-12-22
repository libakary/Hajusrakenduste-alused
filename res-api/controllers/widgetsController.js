let widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const getWidgetById = function(id) { // tegime korduva rea jaoks funktsiooni?
    return widgets.find(x => x.id == id)
}

exports.getAll = (req, res) => { // toob kõik widgetid
    res.send(widgets)
}

exports.getById = (req, res) => {
    const result = getWidgetById(req.params.id)
    if (typeof result === 'undefined') { //kontroll et on olemas see id üldse
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(result)
}

exports.create = (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newWidget = {
        id: widgets[widgets.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price
        
    }
    widgets.push(newWidget)
    res.status(201).location('http://localhost:8080/widgets/' + newWidget.id).send(
        newWidget
    )
}

exports.update = (req,res)=> {
    const result = getWidgetById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: 'Widget not found' })
    }

    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.name = req.body.name
    result.price = req.body.price
    res.status(200)
        .location('http://localhost:8080/widgets/' + result.id)
        .send(result)
}

exports.delete = (req,res)=> {
    const widgetToDelete = getWidgetById(req.params.id)
    if (typeof widgetToDelete === 'undefined') {
        return res.status(404).send({ error: 'Widget not found' })
    }
    widgets = widgets.filter(w => w.id !== widgetToDelete.id) // eemaldab hulgast kustutatu
    res.status(204).send()
}