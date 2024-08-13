import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js"

const app = express()

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 3000

connectDB()
.then(()=>{
  app.on("errror", (error) => {
      console.log("ERRR: ", error);
      throw error
  })
  app.listen(port,()=>{
      console.log(`Server is listening at port ${port}`)})
})
.catch((err)=>{
  console.log("MongoDb Connection failed :", err);
});
app.get("/",(req, res) => {
    res.send('hello world')
  })