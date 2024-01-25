import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
  return res.status(200).json({ msg: "👍" });
});

export default healthRouter;
