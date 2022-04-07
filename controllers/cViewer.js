const  Viewer = require('../models/Viewer');

function listall(req, res) {
    Viewer.find({})
        .then(viewers => {
            if (viewers.length) return res.status(200).send({ viewers })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let viewer = new Viewer(req.body);
    viewer.save()
        .then(viewer =>
            res.status(201).send({ viewer })
        ).catch(err => res.status(500).send({ err }))

}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.viewers) return res.status(404).send({ message: 'Not Found' });
    let viewers = req.body.viewers;
    return res.status(200).send({ viewers });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.viewers) return res.status(404).send({ message: 'Not Found' });
    let viewer = req.body.viewers[0];
    viewer = Object.assign(viewer, req.body);
    viewer.save()
        .then(viewer => res.status(200).send({ message: 'User Updated', viewer })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.viewers) return res.status(404).send({ message: 'Not Found' });
    req.body.viewers[0].remove()
        .then(viewer => {
            res.status(200).send({ message: 'User removed', viewer })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Viewer.find(query).then(viewers => {
        if (!viewers.length) return next();
        req.body.viewers = viewers;
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