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

async function show(req, res) {
    try {
        const user = await Viewer.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function update(req, res) {
    try {
        const viewer = await Viewer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).send({ message: 'User Updated', viewer });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleted(req, res) {
    try {
        const viewer = await Viewer.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User Deleted', viewer });
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