const express = require("express");
const app = express();
const port = 3030;
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const path = require("path");

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(router);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

// Coba nanti deploy ke koyeb untuk backend api nya dan vercel untuk frontendnya, atau bisa juga menggunakan railway
