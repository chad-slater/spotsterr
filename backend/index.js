require("dotenv").config();
const axios = require("axios").default;
const { errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/songsterr", require("./routes/songsterrRoutes"));
app.use("/api/spotify", require("./routes/spotifyRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Spotsterr listening on port http://localhost:${PORT}`);
});
