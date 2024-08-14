import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js";

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