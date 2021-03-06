const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (request, response) => {
    try{
        const {email} = request.body;

        if (await User.findOne({email})){
            return response.status(400).send({error: 'User already exists.'});
        }

        const user = await User.create(request.body);
        
        user.password = undefined;

        return response.send({user});
    }catch(err){
        return response.status(400).send({error: 'Registration failed.'});
    }
}); 

module.exports = (app) => app.use('/auth', router);