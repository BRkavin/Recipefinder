require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const morgan = require('morgan');
// database connection
connection();

// middlewares
app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());
console.log('JWT Secret Key:', process.env.JWTPRIVATEKEY); 
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
