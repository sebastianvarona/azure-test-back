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

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.streamers) return res.status(404).send({ message: 'Not Found' });
    let streamers = req.body.streamers;
    return res.status(200).send({ streamers });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.streamers) return res.status(404).send({ message: 'Not Found' });
    let streamer = req.body.streamers[0];
    streamer = Object.assign(streamer, req.body);
    streamer.save()
        .then(streamer => res.status(200).send({ message: 'User Updated', streamer })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.streamers) return res.status(404).send({ message: 'Not Found' });
    req.body.streamers[0].remove()
        .then(streamer => {
            res.status(200).send({ message: 'User removed', streamer })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Streamer.find(query).then(streamers => {
        if (!streamers.length) return next();
        req.body.streamers = streamers;
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