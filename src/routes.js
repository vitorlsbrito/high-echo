const { Router } = require('express');

const PatientController = require('./app/controllers/PatientController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: false });
});

router.get('/patients', PatientController.index);
router.post('/patients', PatientController.store);
router.get('/patients/:id', PatientController.show);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.delete);

module.exports = router;