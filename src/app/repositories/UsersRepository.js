const db = require('../../database');

class UsersRepository {
    async findAll() {
        const rows = await db.query(`
            SELECT * FROM dasa_usuarios
        `);

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM dasa_usuarios
            WHERE id = $1
        `, [id]);

        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT * FROM dasa_usuarios
            WHERE email = $1
        `, [email]);

        return row;
    }

    async store({ name, email, password, admin, active }) {
        const [row] = await db.query(`
            INSERT INTO dasa_usuarios (nome, email, senha, admin, active)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [name, email, password, admin, active]);

        return row;
    }

    async update(id, { name, email, password, admin, active }) {
        const [row] = await db.query(`
            UPDATE dasa_usuarios SET nome = $1, email = $2, senha = $3, admin = $4, active = $5
            WHERE id = $6
            RETURNING *
        `, [name, email, password, admin, active, id]);

        return row;
    }

    async delete(id) {
        const deleteOp = await db.query(`
            DELETE FROM dasa_usuarios WHERE id = $1
        `, [id]);

        return deleteOp;
    }
}

module.exports = new UsersRepository();
