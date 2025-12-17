const express = require('express');
const router = express.Router();
const controller = require('../controllers/sessionController');
const validateSession = require('../middleware/ValidateSession');

router.get('/', controller.getAllSessions);
router.get('/:id', controller.getSessionById);
router.post('/', validateSession, controller.createSession);
router.delete('/:id', controller.deleteSession);

module.exports = router;
