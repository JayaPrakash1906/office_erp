const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", bookingRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected and tables synchronized successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
