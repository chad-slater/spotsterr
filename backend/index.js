require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/songsterr", require("./routes/songsterrRoutes"));
app.use("/api/spotify", require("./routes/spotifyRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
}

app.get("/", (req, res) => res.send("Please set environment to production"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Spotsterr listening on port http://localhost:${PORT}`);
});
