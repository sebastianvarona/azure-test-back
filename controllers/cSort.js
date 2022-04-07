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

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.sorteos) return res.status(404).send({ message: 'Not Found' });
    let sorteos = req.body.sorteos;
    return res.status(200).send({ sorteos });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.sorteos) return res.status(404).send({ message: 'Not Found' });
    let sorteo = req.body.sorteos[0];
    sorteo = Object.assign(sorteo, req.body);
    sorteo.save()
        .then(sorteo => res.status(200).send({ message: 'Sort Updated', sorteo })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.sorteos) return res.status(404).send({ message: 'Not Found' });
    req.body.sorteos[0].remove()
        .then(sorteo => {
            res.status(200).send({ message: 'Sort removed', sorteo })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Sorteo.find(query).then(sorteos => {
        if (!sorteos.length) return next();
        req.body.sorteos = sorteos;
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