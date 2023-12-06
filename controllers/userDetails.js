const userDetails = (req, res)=>{
    console.log(req.locals);
    return res.status(200).send({
        status: 200,
        message: "userDetails controller running.",
        data: req.locals
    })
}


module.exports = userDetails