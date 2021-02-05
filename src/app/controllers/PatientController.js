const PatientsRepository = require('../repositories/PatientsRepository');

class PatientController {
    async index(req, res) {
        const patients = await PatientsRepository.findAll();

        res.json(patients);
    }

    async show(req, res) {
        const { pac_cpf } = req.params;

        const patient = await PatientsRepository.findByDocument(pac_cpf);

        if(!patient) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        res.json(patient);
    }

    async store(req, res) {
        let { pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular } = req.body;

        const patientExists = await PatientsRepository.findByDocument(pac_cpf);

        if(patientExists) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        const patient = await PatientsRepository.store({ pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular });

        res.json(patient);
    }

    async update(req, res) {
        const id = req.params.pac_cpf;
        let { pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular } = req.body;

        const patientExists = await PatientsRepository.findByDocument(id);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        const documentExists = await PatientsRepository.findByDocument(pac_cpf);


        if(documentExists && documentExists.pac_cpf !== id) {
            return res.status(400).json({ error: 'Patient already exists' });
        }

        const patient = await PatientsRepository.update(id, {
            pac_cpf,
            pac_nome,
            pac_dtnasc,
            pac_email,
            pac_celular
        });

        res.json(patient);
    }

    async delete(req, res) {
        const { pac_cpf } = req.params;

        const patientExists = await PatientsRepository.findByDocument(pac_cpf);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        PatientsRepository.delete(pac_cpf);

        res.sendStatus(204);
    }
}

module.exports = new PatientController();
