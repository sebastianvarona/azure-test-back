const  Sorteo = require('../models/Sort');

function listall(req, res) {
    Sorteo.find({})
        .then(sorteos => {
            if (sorteos.length) return res.status(200).send({ sorteos })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let sorteo = new Sorteo(req.body);
    sorteo.save()
        .then(sorteo =>
            res.status(201).send({ sorteo })
        ).catch(err => res.status(500).send({ err }))

}

async function show(req, res) {
    try {
        const user = await Sorteo.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function update(req, res) {
    try {
        const sorteo = await Sorteo.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).send({ message: 'User Updated', sorteo });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleted(req, res) {
    try {
        const sorteo = await Sorteo.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User Deleted', sorteo });
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = {
    listall,
    show,
    create,
    update,
    deleted
}