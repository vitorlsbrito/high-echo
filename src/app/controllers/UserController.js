const bcrypt = require('bcryptjs');

const UsersRepository = require('../repositories/UsersRepository');

class UserController {
    async index(req, res) {
        const users = await UsersRepository.findAll();

        let usersWithoutPassword = Array();
        
        users.map((user) => {
            delete user.password;
            usersWithoutPassword.push(user);
        });

        res.json(usersWithoutPassword);
    }

    async show(req, res) {
        const { id } = req.params;

        const user = await UsersRepository.findById(id);

        if(!user) {
            return res.status(400).json({ error: 'User does not exists.' });
        }

        delete user.password;

        res.json(user);
    }

    async store(req, res) {
        const { name, email, password, admin, active } = req.body;

        const userExists = await UsersRepository.findByEmail(email);

        if(userExists) {
            return res.status(400).json({ error: 'This e-mail is already in use.' });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const user = await UsersRepository.store({
            name,
            email,
            password: passwordHash,
            admin,
            active
        });

        delete user.password;

        res.json(user);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password, admin, active } = req.body;

        const requesterAdmin = req.isAdmin;

        const userExists = await UsersRepository.findById(id);

        if(!userExists) {
            return res.status(400).json({ error: 'User does not exists.' });
        }

        const emailInUse = await UsersRepository.findByEmail();

        if(emailInUse && emailInUse.id != id) {
            return res.status(400).json({ error: 'This e-mail is already in use.' });
        }

        if(admin != userExists.admin && !requesterAdmin) {
            return res.status(401).json({ error: 'You need to be an administrator to set the admin option.' });
        }

        const passwordHash = (!password) ? userExists.password : bcrypt.hashSync(password, 10);

        const user = await UsersRepository.update(id, {
            name,
            email,
            password: passwordHash,
            admin,
            active
        });

        delete user.password;

        res.json(user);
    }

    async delete(req, res) {
        const { id } = req.params;

        const userExists = await UsersRepository.findById(id);

        if(!userExists) {
            return res.status(400).json({ error: 'User does not exists.' });
        }

        UsersRepository.delete(id);

        res.sendStatus(204);
    }
}

module.exports = new UserController();
