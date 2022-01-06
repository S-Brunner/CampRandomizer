const express = require("express");

require('dotenv').config();

const PORT = 8000;
const app = express();

const { getCampers } = require("./handlers")

app.use(express.json());

app.get("/campers", getCampers);

app.get("*", (req, res) => {
    res.status(404).json({ status: 404, message: "Page does not exit" });
});

app.listen(PORT, function() {
    console.info('🌍 Listening on port ' + PORT);
});
