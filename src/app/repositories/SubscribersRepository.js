const db = require('../../database');

class SubscribersRepository {
    async findAll() {
        const rows = await db.query(`
            SELECT * FROM dasa_pacientes_inscritos
        `);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes_inscritos
            WHERE id = $1
        `, [id]);

        return row;
    }

    async findByEmail(pac_email) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes_inscritos
            WHERE pac_email = $1
        `, [pac_email]);

        return row;
    }

    async findByDocument(pac_cpf) {
        const [row] = await db.query(`
            SELECT * FROM dasa_pacientes_inscritos
            WHERE pac_cpf = $1
        `, [pac_cpf]);

        return row;
    }

    async store({ pac_email, pac_cpf }) {
        const [row] = await db.query(`
            INSERT INTO dasa_pacientes_inscritos (pac_email, pac_cpf)
            VALUES ($1, $2)
            RETURNING *
        `, [pac_email, pac_cpf]);

        return row;
    }

    async update(id, { pac_email, pac_cpf }) {
        const [row] = await db.query(`
            UPDATE dasa_pacientes_inscritos SET pac_email = $2, pac_cpf = $3
            WHERE id = $1
            RETURNING *
        `, [id, pac_email, pac_cpf]);

        return row;
    }

    async delete(id) {
        const deleteOp = await db.query(`
            DELETE FROM dasa_pacientes_inscritos WHERE id = $1
        `, [id]);

        return deleteOp;
    }
}

module.exports = new SubscribersRepository();
