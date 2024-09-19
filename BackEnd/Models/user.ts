import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import { Friend } from "./friend";
import { PrivateChat } from "./private_chat";
import { GroupMember } from "./group_member";
import { Group } from "./group";
import { MessageStatus } from "./MessageStatus";

@Table({
  tableName: "Users",
  timestamps: true,
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [2, 8],
    },
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar!: string;

  @Column({
    type: DataType.ENUM("offline", "online"),
    allowNull: false,
    defaultValue: "offline",
  })
  status!: "offline" | "online";

  @HasMany(() => Friend, { foreignKey: "userId" })
  friends!: Friend[];

  @HasMany(() => PrivateChat, { foreignKey: "fromUserId" })
  sentMessages!: PrivateChat[];

  @HasMany(() => PrivateChat, { foreignKey: "toUserId" })
  receivedMessages!: PrivateChat[];

  @HasMany(() => MessageStatus, { foreignKey: "userId" })
  messageStatus!: MessageStatus;

  @HasMany(() => GroupMember, { foreignKey: "memberId" })
  groups!: GroupMember[];

  @HasMany(() => Group, { foreignKey: "adminId" })
  managedGroups!: Group[];
}
