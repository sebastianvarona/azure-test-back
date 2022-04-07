const  Sorteo = require('../models/Sort');

function listall(req, res) {
    Sorteo.find({})
        .then(Sorteos => {
            if (Sorteos.length) return res.status(200).send({ Sorteos })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let Sorteo = new Sorteo(req.body);
    Sorteo.save()
        .then(Sorteo =>
            res.status(201).send({ Sorteo })
        ).catch(err => res.status(500).send({ err }))

}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Sorteos) return res.status(404).send({ message: 'Not Found' });
    let Sorteos = req.body.Sorteos;
    return res.status(200).send({ Sorteos });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Sorteos) return res.status(404).send({ message: 'Not Found' });
    let Sorteo = req.body.Sorteos[0];
    Sorteo = Object.assign(Sorteo, req.body);
    Sorteo.save()
        .then(Sorteo => res.status(200).send({ message: 'User Updated', Sorteo })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.Sorteos) return res.status(404).send({ message: 'Not Found' });
    req.body.Sorteos[0].remove()
        .then(Sorteo => {
            res.status(200).send({ message: 'User removed', Sorteo })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Sorteo.find(query).then(Sorteos => {
        if (!Sorteos.length) return next();
        req.body.Sorteos = Sorteos;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = {
    listall,
    show,
    create,
    update,
    deleted,
    find,
}