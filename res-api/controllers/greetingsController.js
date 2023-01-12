let greetings = [
    { id: 1, recipient: "Cizzbor", message: "Helo", sender: "Crazlinger"},
    { id: 2, recipient: "Woowo", message: "Hey", sender: "Cizzbor"},
    { id: 3, recipient: "Crazlinger", message: "Hii", sender: "Woowo"},
]

const getGreetingById = function(id) { // tegime korduva rea jaoks funktsiooni?
    return greetings.find(x => x.id == id)
}

exports.getAll = (req, res) => { // toob kõik widgetid
    res.send(greetings)
}

exports.getById = (req, res) => {
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') { //kontroll et on olemas see id üldse
        return res.status(404).send({ error: "Item not found" })
    }
    res.send(result)
}

exports.create = (req, res) => {
    if (!req.body.recipient || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newItem = {
        id: greetings[greetings.length - 1].id + 1,
        recipient: req.body.recipient,
        message: req.body.message,
        sender: req.body.sender
        
    }
    greetings.push(newItem)
    res.status(201)
        .location('http://localhost:8080/greetings/' + newItem.id)
        .send(newItem)
}

exports.update = (req,res)=> {
    const result = getGreetingById(req.params.id)
    if (typeof result === 'undefined') {
        return res.status(404).send({ error: 'Item not found' })
    }

    if (!req.body.recipient || !req.body.message || !req.body.sender) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    result.recipient = req.body.recipient
    result.message = req.body.message
    result.sender = req.body.sender
    res.status(200)
        .location('http://localhost:8080/greetings/' + result.id)
        .send(result)
}

exports.delete = (req,res)=> {
    const itemToDelete = getGreetingById(req.params.id)
    if (typeof itemToDelete === 'undefined') {
        return res.status(404).send({ error: 'Item not found' })
    }
    greetings = greetings.filter(w => w.id !== itemToDelete.id) // eemaldab hulgast kustutatu
    res.status(204).send()
}