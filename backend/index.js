const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Spotsterr listening on port http://localhost:${PORT}`);
});
