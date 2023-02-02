import { Router } from "express";

import blogRouter from "./blog.router.js";
import queryRouter from "./contact.router.js";

const apiRouter = Router();

apiRouter.use("/blogs", blogRouter);
apiRouter.use("/contact", queryRouter);

export default apiRouter;
