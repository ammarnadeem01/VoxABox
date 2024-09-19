import dotenv from "dotenv";
import app from "./app";
import { Sequelize } from "sequelize-typescript";
import { User } from "./Models/user";
import { Friend } from "./Models/friend";
import { Group } from "./Models/group";
import { GroupMember } from "./Models/group_member";
import { PrivateChat } from "./Models/private_chat";
import { GroupChat } from "./Models/group_chat";
import { MessageStatus } from "./Models/MessageStatus";

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;
const database: string = process.env.POSTGRES_DB!;
const username: string = process.env.POSTGRES_USER!;
const password: string = process.env.POSTGRES_PASSWORD!;
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database,
  username,
  password,
  models: [
    User,
    Friend,
    Group,
    GroupChat,
    PrivateChat,
    GroupMember,
    MessageStatus,
  ],
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
