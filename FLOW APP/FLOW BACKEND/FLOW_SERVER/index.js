const express = require("express")
const app = express()
const userRouter = require("./route/users")
const {jwtAuth} = require("./utils/jwtauth")

app.use(express.json())
app.use(jwtAuth)
app.use("/users", userRouter)

const port = 3000
app.listen(port, "0.0.0.0", () => {
    console.log("server ready at port", port)
})
