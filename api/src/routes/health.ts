import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  return res.status(200).json({ message: "👍" });
});

export default healthRouter;
