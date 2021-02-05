const db = require('../../database');

class ExamsRepository {
    async findAll() {
        const rows = await db.query(`
            SELECT * FROM dasa_exames_agendados
        `);

        return rows;
    }

    async findByPatient(pac_cpf) {
        const rows = await db.query(`
            SELECT * FROM dasa_exames_agendados 
            WHERE pac_cpf = $1
        `, [pac_cpf]);

        return rows;
    }

    async findByExam(exa_codigo) {
        const rows = await db.query(`
            SELECT * FROM dasa_exames_agendados 
            WHERE exa_codigo = $1
        `, [exa_codigo]);

        return rows;
    }
}

module.exports = new ExamsRepository();
