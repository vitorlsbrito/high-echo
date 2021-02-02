const { Router } = require('express');

const ensureAuthenticated = require('./app/middlewares/ensureAuthenticated');
const corsAuthorization = require('./app/middlewares/corsAuthorization');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

/* Users */
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

/* Sessions */
router.post('/sessions', SessionController.auth);

/* Authenticated Routes */
router.use(ensureAuthenticated);

/* Users */
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;
