const { Router } = require('express');

const ensureAuthenticated = require('./app/middlewares/ensureAuthenticated');
const corsAuthorization = require('./app/middlewares/corsAuthorization');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PatientController = require('./app/controllers/PatientController');
const ExamController = require('./app/controllers/ExamController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});


/* Sessions */
router.post('/sessions', SessionController.auth);

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
router.get('/exams', (req, res) => {
    Object.keys(req.query).length == 0 ? ExamController.index(req, res) : ExamController.show(req, res);
});

module.exports = router;
