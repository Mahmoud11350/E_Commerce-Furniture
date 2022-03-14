require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect-db.js");
const app = express();
const multer = require("multer");
const xss = require("xss-clean");
const cors = require("cors");
const expressLimiter = require("express-rate-limit");
const mongoSantization = require("express-mongo-sanitize");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRouters");
const { authMiddleware } = require("./middleware/authmiddleware");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");

const cloud = require("cloudinary").v2;
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({
  dest: "./temp",
  limits: {
    fileSize: 1000000,
  },
});
//preMiddleware
app.set("trust proxy", 1);
app.use(cors());
app.use(xss());
app.use(mongoSantization());
app.use(
  expressLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.TOKEN_SECRET));
app.use(upload.single("image"));

//routes
app.get("/", (req, res) => {
  res.send("<h1>E-COMMERCE API</h1>");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", authMiddleware, orderRouter);

//afterMiddleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("server is up on port " + PORT));
  } catch (error) {}
};

start();
