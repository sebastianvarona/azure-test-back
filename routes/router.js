const express = require('express');
const cViewer = require('../controllers/cViewer');
const cStreamer = require('../controllers/cStreamer');
const cSort= require('../controllers/cSort');

const router = express.Router();

// Viewer
router.get('/viewer/', cViewer.listall);
router.post('/viewer/', cViewer.create)
router.get('/viewer/:key/:value', cViewer.find, cViewer.show)
router.put('/viewer/:key/:value', cViewer.find, cViewer.update)
router.delete('/viewer/:key/:value', cViewer.find, cViewer.deleted)

// Streamer
router.get('/streamer/', cStremer.listall);
router.post('/streamer/', cStreamer.create)
router.get('/streamer/:key/:value', cStreamer.find, cStreamer.show)
router.put('/streamer/:key/:value', cStreamer.find, cStreamer.update)
router.delete('/streamer/:key/:value', cStreamer.find, cStreamer.deleted)
//Sorteo
router.get('/sorteo/', cSort.listall);
router.post('/sorteo/', cSort.create)
router.get('/sorteo/:key/:value', cSort.find, cSort.show)
router.put('/sorteo/:key/:value', cSort.find, cSort.update)
router.delete('/sorteo/:key/:value', cSort.find, cSort.deleted)
module.exports = router;
