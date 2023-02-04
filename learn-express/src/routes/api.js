import { Router } from "express";

import blogRouter from "./blog.router.js";
import queryRouter from "./contact.router.js";
import adminRouter from "./admin.router.js";

const apiRouter = Router();

apiRouter.use("/blogs", blogRouter);
apiRouter.use("/contact", queryRouter);
apiRouter.use("/admin", adminRouter);

export default apiRouter;
