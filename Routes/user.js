
const config = require('config');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

const checkToken = require('../Utils/checkToken');
const { getUsers } = require('../Queries/userQueries');

router.get('/', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).send('No name entered.');
    }
    let data;
    try {
        data = await getUsers(name);
    } catch (err)
    {
        return res.status(400).send('error occurred');
    }

    return res.status(200).send(data);
});

module.exports = router;
