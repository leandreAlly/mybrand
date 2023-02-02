import { Router } from "express";

import blogRouter from "./blog.router.js";

const apiRouter = Router();

apiRouter.use("/blogs", blogRouter);

export default apiRouter;
