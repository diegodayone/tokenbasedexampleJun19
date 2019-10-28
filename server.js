const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productsRouter")
const cartRouter = require("./routes/cartRouter")
const auth = require("./auth")
const passport = require("passport")

//this could be your localhost mongodb address
const url = "mongodb+srv://diegostriveschool:h6nxg5U9SDcsLA26@cluster0-3ar0p.azure.mongodb.net/test?retryWrites=true&w=majority"
const connection = mongoose.connect(url, { useNewUrlParser: true})
connection.then(db=>{
    console.log("Database up & running")
},
err =>{
    console.log(err)
})

var server = express()
server.set("port", process.env.PORT || 3333);
server.use(cors())
server.use(express.json()) //equal to body-parser
server.use(passport.initialize())

server.use("/users", userRouter)
server.use("/products", passport.authenticate("jwt"), productRouter)
server.use("/cart", cartRouter)

server.get("/", (req, res) => {
    res.send("Hello")
})

server.listen(server.get("port"), () => {
    console.log("Server is listening on port 3333")
})