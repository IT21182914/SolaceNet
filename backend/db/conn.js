const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((result) => {
  console.log("MongoDB Connected!!!🍃");
}).catch((err) => {
  console.log(err);
});

module.exports = mongoose;