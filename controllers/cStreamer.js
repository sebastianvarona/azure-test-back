const  Streamer = require('../models/Streamer');

function listall(req, res) {
    Streamer.find({})
        .then(streamers => {
            if (streamers.length) return res.status(200).send({ streamers })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let streamer = new Streamer(req.body);
    streamer.save()
        .then(streamer =>
            res.status(201).send({ streamer })
        ).catch(err => res.status(500).send({ err }))

}

async function show(req, res) {
    try {
        const user = await Streamer.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function update(req, res) {
    try {
        const streamer = await Streamer.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).send({ message: 'User Updated', streamer });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deleted(req, res) {
    try {
        const streamer = await Streamer.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User Deleted', streamer });
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