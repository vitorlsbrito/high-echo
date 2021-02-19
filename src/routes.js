const { Router } = require('express');

const ensureAuthenticated = require('./app/middlewares/ensureAuthenticated');
const corsAuthorization = require('./app/middlewares/corsAuthorization');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PatientController = require('./app/controllers/PatientController');
const ExamController = require('./app/controllers/ExamController');
const SubscriberController = require('./app/controllers/SubscriberController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

/* Authenticated Routes */
router.use(corsAuthorization);

/* Sessions */
router.post('/sessions', SessionController.auth);

/* Subscriber */
router.get('/subscribers', SubscriberController.index);
router.get('/subscribers/:id', SubscriberController.show);
router.post('/subscribers', SubscriberController.store);

/* Authenticated Routes */
router.use(ensureAuthenticated);

/* Users */
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

/* Patients */
router.get('/patients', PatientController.index);
router.get('/patients/:pac_cpf', PatientController.show);
router.post('/patients', PatientController.store);
router.put('/patients/:pac_cpf', PatientController.update);
router.delete('/patients/:pac_cpf', PatientController.delete);

/* Exams */
/*router.get('/exams', ExamController.index);*/
router.get('/exams', ExamController.show);

module.exports = router;
