import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import userRouter from "./Routes/user";
import friendRouter from "./Routes/friend";
import privateChatRouter from "./Routes/private_chat";
// import groupChatRouter from "./Routes/group_chat";
import groupRouter from "./Routes/group";
import groupMemberRouter from "./Routes/group_member";
import CustomError from "./Utils/CustomError";
import globalErrorHandler from "./Controllers/error";
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/friend", friendRouter);
app.use("/api/v1/privatechat", privateChatRouter);
// app.use("/api/v1/groupchat", groupChatRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/groupmember", groupMemberRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});
app.use(globalErrorHandler);
export default app;
