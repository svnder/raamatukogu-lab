const express = require("express");
const cors = require("cors");
const path = require("path");
const data = require("./data");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const loansRouter = require("./routes/loans");

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

if (ENV === "development") {
  app.use((req, res, next) => {
    console.log(`[DEV] ${req.method} ${req.url}`);
    next();
  });
}

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/loans", loansRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", env: ENV, port: PORT, timestamp: new Date().toISOString() });
});

app.get("/api/stats", (req, res) => {
  res.json({
    totalBooks: data.books.length,
    availableBooks: data.books.filter((b) => b.available).length,
    totalLoans: data.loans.length,
    activeLoans: data.loans.filter((l) => !l.returnedAt).length,
    returnedLoans: data.loans.filter((l) => l.returnedAt).length,
    totalUsers: data.users.length,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Raamatukogu server jookseb: http://localhost:${PORT}`);
  console.log(`Keskkond: ${ENV}`);
});
