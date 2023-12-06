const Joi = require('joi');
const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userLogin = async (req, res) => {
    const {username, password} = req.body

    const isValid = Joi.object({                       // Validating Data from user by using Joi package
        username: Joi.string().required(),
        password: Joi.string().required()
    }).validate(req.body)

    if(isValid.error){         
        return res.status(400).send({
            status: 400,
            message: "Invalid Username/Password",
            data: isValid.error
        })
    }

    let userDetails;

    try {
        
        userDetails = await userSchema.findOne({username});           // getting userdata from database using username

        if(!userDetails){
            return res.status(401).send({
                status: 401,
                message: "User Not Found. Enter Valid User Details.",
            })
        }

    } catch (err) {
        return res.status(400).send({
            status: 400,
            message: "Failed to fetch userdata from Database!",
            data: err
        })
    }

    console.log(userDetails.password)

    const isPassword = await bcrypt.compare(password, userDetails.password);

        if(!isPassword){
            return res.status(401).send({
                status: 401,
                message: "Incorrect Password!"
            })
        }

        const payload = {
            username : userDetails.username,
            name: userDetails.name,
            email: userDetails.email,
            gender: userDetails.gender,
            address: userDetails.address
        }

        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY)

        return res.status(200).send({
            status:200,
            message: "User Login Successful",
            data: { token }
        })

}

module.exports = userLogin