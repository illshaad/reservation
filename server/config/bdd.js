const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(
    "mongodb+srv://reservation:vtpRnzQaj3XUHFlj@cluster0.hxz6lil.mongodb.net/",
    options
  )
  .then(() => {
    console.info("connexion ok");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
