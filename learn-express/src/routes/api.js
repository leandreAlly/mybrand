import { Router } from "express";

import blogRouter from "./blog.router.js";
import queryRouter from "./contact.router.js";
import adminRouter from "./admin.router.js";
import commentRouter from "./comment.router.js";
import likesRouter from "./likes.router.js";
import reportRouter from "./report.router.js";

const apiRouter = Router();

apiRouter.use("/blogs", blogRouter);
apiRouter.use("/contact", queryRouter);
apiRouter.use("/auth", adminRouter);
apiRouter.use("/blogs", commentRouter);
apiRouter.use("/blogs", likesRouter);
apiRouter.use("/report", reportRouter);

export default apiRouter;
