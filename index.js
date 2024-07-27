const express = require("express");
const process = require("process");
const dotenv = require("dotenv");

dotenv.config();


const AIroute = require("./Routes/Moddyroutes");
const Bookroutes = require("./Routes/BookRoutes");
const AdminRoute = require("./Routes/Adminroutes");
const Moodyroute = require("./Routes/Moddyroutes");






require("./Connection/Conn");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(AIroute);
app.use(AdminRoute)
app.use(Bookroutes)
app.use(Moodyroute)



app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
