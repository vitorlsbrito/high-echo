const db = require('../../database');

class PatientsRepository {
    async findAll() {
        const rows = await db.query(`
            SELECT * FROM dasa_pacientes
        `);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes 
            WHERE id = $1
        `, [id]);

        return row;
    }

    async findByDocument(document) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes 
            WHERE pac_cpf = $1
        `, [document]);

        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes 
            WHERE pac_email = $1
        `, [email]);

        return row;
    }

    async store({ document, name, birthday, email, phone }) {
        const [row] = await db.query(`
            INSERT INTO dasa_pacientes
            (pac_cpf, pac_nome, pac_dtnasc, pac_email, pac_celular) VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [document, name, birthday, email, phone]);

        return row;
    }

    async update(document, { name, birthday, email, phone }) {
        const [row] = await db.query(`
            UPDATE dasa_pacientes SET pac_nome = $2, pac_dtnasc = $3, pac_email = $4, pac_celular = $5
            WHERE pac_cpf = $1
            RETURNING *
        `, [document, name, birthday, email, phone]);

        return row;
    }

    async delete(document) {
        const [row] = await db.query(`
            DELETE FROM app_alexa.dasa_pacientes 
            WHERE pac_cpf = $1
        `, [document]);

        return row;
    }
}

module.exports = new PatientsRepository();