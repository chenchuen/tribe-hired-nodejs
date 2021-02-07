const md5 = require('md5');
const Joi = require('@hapi/joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const { login, signup } = require('../Queries/authQueries');

const generateAuthToken = (user) => {
    const { id } = user;

    return jwt.sign({ id }, config.get('secretKey'));
}

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})")),
    });

    return schema.validate(user);
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('No email or password.');
    }
    const hashedPassword = md5(password);
    const data = await login(email, hashedPassword);

    if (data) {
        const token = generateAuthToken(data.userId);
        res.status(200).send({
            token: token
        });
    } else {
        return res.status(400).send('Invalid email or password.');
    }
});


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('No email or password.');
    }

    const { error } = validateUser(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).send(errorMessage);
    }
    
    const hashedPassword = md5(password);
    let data;
    try {
        data = await signup(name, email, hashedPassword);
    } catch (err)
    {
        if (err === "ER_DUP_ENTRY") res.status(400).send("Email is already taken");
        else res.status(400).send(err);
    }
    console.log(data);
    if (data !== 0) {
        res.status(200).send();
    } else {
        return res.status(400).send('Error when signing up');
    }
});

module.exports = router;
