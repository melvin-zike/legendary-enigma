const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const tagRoute = require("./routes/tags");
const adsRoute = require("./routes/ads");
const challengesRoute = require("./routes/challenges");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const transactionRoute = require("./routes/transactions");
const path = require("path");
const cors = require('cors');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

//cors headers
app.use(cors());

app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/ads", adsRoute);
app.use("/api/challenges", challengesRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/tags", tagRoute);
// app.use("/api/comments", commentRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend server is running!");
});