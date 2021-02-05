const ExamsRepository = require('../repositories/ExamsRepository');

class ExamController {
    async index(req, res) {
        const exams = await ExamsRepository.findAll();

        res.json(exams);
    }

    async show(req, res) {
        const { pac_cpf, exa_codigo } = req.query;

        let exam;

        if(pac_cpf && exa_codigo) {
            exam = await ExamsRepository.findByPatient(pac_cpf);

            const a = exam.map((item) => {
                if( item.exa_codigo == exa_codigo) { return item; }
            });

            exam = a;
        } else if(pac_cpf) {
            exam = await ExamsRepository.findByPatient(pac_cpf);
        } else if (exa_codigo) {
            exam = await ExamsRepository.findByExam(exa_codigo);
        } else {
            res.sendStatus(500);
        }

        res.json(exam);
    }

    async showByPatient(req, res) {
        const { pac_cpf } = req.params;

        const exams = await ExamsRepository.findByPatient(pac_cpf);

        if(!exams) {
            return res.status(400).json({ error: 'Has no exam to this patient.' });
        }

        res.json(exams);
    }

    async showByExam(req, res) {
        const { exa_codigo } = req.params;

        const exams = await ExamsRepository.findByDocument(exa_codigo);

        if(!exams) {
            return res.status(400).json({ error: 'Has no exam to this code.' });
        }

        res.json(exams);
    }
}

module.exports = new ExamController();
