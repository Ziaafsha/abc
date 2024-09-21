const express = require("express");
const app = express();
const port = 5000;
const db = require("./database");
const router = require("./route/index");

app.use(express.json());
app.use("/api", router);

app.listen(port, () => (console.log(`Server Started ${port}`)));