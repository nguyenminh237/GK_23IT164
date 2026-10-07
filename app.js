require("dotenv").config();

const { engine } = require("express-handlebars");
const path = require("path");

const express = require("express");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");

const { readConnection, writeConnection } = require("./config/database");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  }),
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// SESSION LƯU TRÊN MONGODB ATLAS
// ==============================
app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.SESSION_URI,
      collectionName: "sessions",
    }),

    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Management - 23IT164");
});

const PORT = process.env.PORT || 3000;

app.get("/test-session", (req, res) => {
  if (!req.session.visitCount) {
    req.session.visitCount = 1;
  } else {
    req.session.visitCount++;
  }

  res.json({
    message: "Session đang được lưu trên MongoDB Atlas",
    visitCount: req.session.visitCount,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
