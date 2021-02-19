const SubscribersRepository = require('../repositories/SubscribersRepository');

class SubscriberController {
    async index(req, res) {
        const subscribers = await SubscribersRepository.findAll();

        res.json(subscribers);
    }

    async show(req, res) {
        const { id } = req.params;

        const subscriber = await SubscribersRepository.findById(id);

        if(!subscriber) {
            return res.status(400).json({ error: 'This subscription do not exists.' });
        }

        res.json(subscriber);
    }

    async store(req, res) {
        const { pac_cpf, pac_email } = req.body;

        const subscriptionExists = await SubscribersRepository.findByEmail(pac_email);

        if (subscriptionExists) {
            res.status(400).json({ error: 'This subscription already exists.' });
        }

        const subscriber = await SubscribersRepository.store({ pac_cpf, pac_email });

        res.json(subscriber);
    }

    async update(req, res) {
        const { id } = req.params.pac_cpf;
        let { pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular } = req.body;

        const patientExists = await SubscribersRepository.findByDocument(id);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        const documentExists = await SubscribersRepository.findByDocument(pac_cpf);


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

        const patientExists = await SubscribersRepository.findByDocument(pac_cpf);

        if(!patientExists) {
            return res.status(400).json({ error: 'Patient does not exists.' });
        }

        PatientsRepository.delete(pac_cpf);

        res.sendStatus(204);
    }
}

module.exports = new SubscriberController();
