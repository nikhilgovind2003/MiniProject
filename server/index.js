import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"


const app = express()
app.use(cors())


// ROUTES
app.get("/", (req, res) => {
    res.json("hello world")
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongodb Connected successfully");
    app.listen(4000,()=>{
        console.log(`Server runs at the port ${process.env.PORT}`);
    })
})
.catch((err)=>{console.log(err)})



// 0fttJ3dCqWDTKAYa