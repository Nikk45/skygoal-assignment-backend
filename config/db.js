const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB Connected Successfully!");
})
.catch((err)=>{
    console.log("Failed to connect MONGODB: ",err.message);
})