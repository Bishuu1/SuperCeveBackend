const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//setings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

//routes
app.use("/api", require("./routes/index"));
app.use("/api/Users", require("./routes/Users"));
app.use("/api/SetEntries", require("./routes/SetEntries"));
app.use("/api/Template", require("./routes/Template"));

module.exports = app;
