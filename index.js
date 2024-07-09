const express = require("express");
const app = express();
const port = 3030;
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
