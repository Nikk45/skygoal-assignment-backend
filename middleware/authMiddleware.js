const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers['sky_goals'];

    let isVerified;

    try{
        isVerified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log("IsVerified or not: ",isVerified);

    }catch(err){
        return res.status(400).send({
            status: 400,
            message: "JWT not Provided!",
            data: err
        })
    }

    if(isVerified){
        req.locals = isVerified;
        next();
    }else{
        return res.status(401).send({
            status: 401,
            message: "Failed to Authenticate!",
        })
    }
}

module.exports = auth