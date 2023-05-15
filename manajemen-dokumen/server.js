//import
const express = require("express");
const cors = require("cors");

//implementasi
const app = express();
app.use(cors());

app.use(express.static(__dirname));

//endpoint
const user = require("./router/user");
app.use("/manajemen/user", user);

const dokumen = require("./router/dokumen");
app.use("/manajemen/dokumen", dokumen);

//run server
app.listen(4040, () => {
  console.log("server run on port 4040");
});
