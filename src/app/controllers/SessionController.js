require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersRepository = require('../repositories/UsersRepository');

class SessionController {
    async auth(req, res) {
        const { email, password } = req.body;

        console.log(req.body);

        const user = await UsersRepository.findByEmail(email);

        if(!user) {
            return res.status(400).json({ error: 'User does not exists.' });
        }

        console.log(user);

        const passwordMatch = await bcrypt.compareSync(password, user.senha);

        if(!passwordMatch) {
            return res.status(400).json({ error: 'Password is incorrect.' });
        }

        const token = jwt.sign({
            admin: user.admin
        }, process.env.JWT_TOKEN, {
            subject: user.id,
            expiresIn: '1d',
        });

        res.json({
            user,
            token
        });
    }
}

module.exports = new SessionController();