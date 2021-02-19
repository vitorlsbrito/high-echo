const ExamsRepository = require('../repositories/ExamsRepository');

class ExamController {
    async index(req, res) {
        const exams = await ExamsRepository.findAll();

        res.json(exams);
    }

    async show(req, res) {
        const { pac_cpf, exa_codigo } = req.body;

        if (!pac_cpf || !exa_codigo) {
            const exams = await ExamsRepository.findAll();
            return res.json(exams);
        }

        const exams = await ExamsRepository.findByPatient(pac_cpf);

        let matchedExams;

        exams.map((exam) => {
            if (exam.exa_codigo == exa_codigo) {
                matchedExams = exam;
            }
        });

        if (!matchedExams) {
            res.status(400).json({ 'error': 'Has no exam to this patient' });
        }


        res.json(matchedExams);
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
