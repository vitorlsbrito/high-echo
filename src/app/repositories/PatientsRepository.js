const db = require('../../database');

class PatientsRepository {
    async findAll() {
        const rows = await db.query(`
            SELECT * FROM dasa_pacientes
        `);

        return rows;
    }

    async findByDocument(pac_cpf) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes 
            WHERE pac_cpf = $1
        `, [pac_cpf]);

        return row;
    }

    async findByEmail(pac_email) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes 
            WHERE pac_email = $1
        `, [pac_email]);

        return row;
    }

    async store({ pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular }) {
        const [row] = await db.query(`
            INSERT INTO dasa_pacientes
            (pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular) VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular]);

        return row;
    }

    async update(id, { pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular }) {
        const [row] = await db.query(`
            UPDATE dasa_pacientes SET pac_cpf = $2, pac_nome = $3, pac_dtnasc = $4, pac_email = $5, pac_celular = $6
            WHERE pac_cpf = $1
            RETURNING *
        `, [id, pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular]);

        return row;
    }

    async delete(pac_cpf) {
        const [row] = await db.query(`
            DELETE FROM dasa_pacientes 
            WHERE pac_cpf = $1
        `, [pac_cpf]);

        return row;
    }
}

module.exports = new PatientsRepository();
