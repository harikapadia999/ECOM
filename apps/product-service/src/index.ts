import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "../middleware/authMiddleware.js";
import productRouter from "../routes/product.route.js";
import categoryRouter from "../routes/category.route.js";

const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  // console.log(auth);
  res.json({ message: "Product service is authenticated", userId: req.userId });
});

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "internal server error" });
});

app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
