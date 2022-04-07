const  Torneo = require('../models/Sort');

function listall(req, res) {
    Torneo.find({})
        .then(torneos => {
            if (torneos.length) return res.status(200).send({ torneos })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let torneo = new Torneo(req.body);
    torneo.save()
        .then(torneo =>
            res.status(201).send({ torneo })
        ).catch(err => res.status(500).send({ err }))

}

async function show(req, res) {
    try {
        const user = await Torneo.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function update(req, res) {
    try {
        const torneo = await Torneo.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).send({ message: 'User Updated', torneo });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleted(req, res) {
    try {
        const torneo = await Torneo.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User Deleted', torneo });
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