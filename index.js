const express = require("express");
const { Connection } = require("./config/db");
const { userRouter } = require("./routes/userroute");
const { empRouter } = require("./routes/emproutes");

require("dotenv").config();

const app = express();
app.use(express.json());
const cors = require("cors"); 
app.use(cors());
app.use("/",userRouter)
app.use("/employees",empRouter)

app.use("/",(req,res)=>{
    res.send({"msg":"Welcome to employee mamanagment portal"})
})
app.listen(process.env.port, async (req, res) => {
  try {
    await Connection;
    console.log("connected with db");
    console.log(`server is running at ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
