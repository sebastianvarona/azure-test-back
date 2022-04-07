const express = require('express');
const cViewer = require('../controllers/cViewer');
const cStreamer = require('../controllers/cStreamer');
const cSort= require('../controllers/cSort');

const router = express.Router();

// Viewer
router.get('/viewers', cViewer.listall);
router.post('/viewer', cViewer.create)
router.get('/viewer/:id', cViewer.show)
router.put('/viewer/:id',  cViewer.update)
router.delete('/viewer/:id', cViewer.deleted)


// Streamer
router.get('/streamers', cStreamer.listall);
router.post('/streamer', cStreamer.create)
router.get('/streamer/:id', cStreamer.show)
router.put('/streamer/:id', cStreamer.update)
router.delete('/streamer/:id', cStreamer.deleted)


//Sorteo
router.get('/sorteos/', cSort.listall);
router.post('/sorteo/', cSort.create)
router.get('/sorteo/:id', cSort.show)
router.put('/sorteo/:id', cSort.update)
router.delete('/sorteo/:id', cSort.deleted)


module.exports = router;
