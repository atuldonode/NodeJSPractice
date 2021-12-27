const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
require("./db/conn")

const userRouter = require("./routes/user.Routes");
const orderRouter = require("./routes/order.routes");
const signupRouter = require("./routes/signup.routes");

app.use(express.json());

app.use(userRouter);
app.use(orderRouter);
app.use(signupRouter);

app.get("/", (req, res) =>{
res.send("helloo this my Assignment");
})


app.listen(port, () =>{
    console.log(`server on At ${port}`);
})
