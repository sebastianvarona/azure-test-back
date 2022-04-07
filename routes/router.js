const express = require('express');
const cViewer = require('../controllers/cViewer');
const cStreamer = require('../controllers/cStreamer');

const router = express.Router();

// Viewer
router.get('/viewer/', cViewer.listall);
router.post('/viewer/', cViewer.create)
router.get('/viewer/:key/:value', cViewer.find, cViewer.show)
router.put('/viewer/:key/:value', cViewer.find, cViewer.update)
router.delete('/viewer/:key/:value', cViewer.find, cViewer.deleted)

// Streamer
router.get('/streamer/', cViewer.listall);
router.post('/streamer/', cViewer.create)
router.get('/streamer/:key/:value', cViewer.find, cViewer.show)
router.put('/streamer/:key/:value', cViewer.find, cViewer.update)
router.delete('/streamer/:key/:value', cViewer.find, cViewer.deleted)

module.exports = router;