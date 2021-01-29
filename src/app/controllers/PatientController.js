const PatientsRepository = require('../repositories/PatientsRepository');

class PatientController {
    async index(req, res) {
        const patients = await PatientsRepository.findAll();

        res.json(patients);
    }

    async show(req, res) {
        const { document } = req.params;

        const patient = await PatientsRepository.findByDocument(document);

        if(!patient) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        res.json(patient);
    }

    async store(req, res) {
        let { document, name, birthday, email, phone } = req.body;

        const patientExists = await PatientsRepository.findByDocument(document);

        if(categoryExists) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        const patient = await PatientsRepository.store({ document, name, birthday, email, phone });

        res.json(patient);
    }

    async update(req, res) {
        const { document } = req.params;
        let { name, birthday, email, phone } = req.body;

        const patientExists = await PatientsRepository.findByDocument(document);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        if(patientExists && patientExists.document !== document) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        const patient = await PatientsRepository.update(document, { name, birthday, email, phone });

        res.json(patient);
    }

    async delete(req, res) {
        const { document } = req.params;

        const patientExists = await PatientsRepository.findByDocument(document);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        PatientsRepository.delete(document);

        res.sendStatus(204);
    }
}

module.exports = new PatientController();