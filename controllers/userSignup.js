const Joi = require('joi');
const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSignup = async (req, res) => {
    const {name, username, email, gender, address, password} = req.body;

    const isValid = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        gender: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().min(8).required()
    }).validate(req.body)

    if(isValid.error){                      // If data is not valid showing error
        return res.status(400).send({
            status: 400,
            message: "Invalid Input",
            data: isValid.error
        })
    }

    try {
        const isExists = await userSchema.find({                  //   checking if data already exists in DB or not 
            $or: [{email, username}]
        });
        
        if(isExists.length!==0){                       // if data exists then showing error 
            return res.status(400).send({
                status:400,
                message: "Username/Email Already Exists"
            })
        }
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Error while checking username and email",
            data: err
        })
    }

    const saltOrRound = Number(process.env.BCRYPT_SALTS);

    const encryptedPassword = await bcrypt.hash(password, saltOrRound)

    const newUser = new userSchema({
        name,
        username,
        email,
        gender,
        address,
        password: encryptedPassword
    })

    try {
        newUser.save();

        return res.status(200).send({
            status: 200,
            message: "User Registered Successfully",
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to register user. Please try again",
            data: err
        })
    }

}

module.exports = userSignup