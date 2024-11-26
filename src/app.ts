import express from "express";
import catatankeuangan from "./routes/catatankeuangan";

const app = express();

// Middleware
app.use(express.json());
app.use("/api/keuangan", catatankeuangan);
app.use(express.static("public")); // Untuk UI

// Port Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
