import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { GroupChat } from "./group_chat";

@Table({
  tableName: "MessageStatus",
  timestamps: true,
})
export class MessageStatus extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => GroupChat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  messageId!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isDeleted!: boolean;

  @Column({
    type: DataType.ENUM("Seen", "Not Seen"),
    defaultValue: "Not Seen",
    allowNull: false,
  })
  status!: "Seen" | "Not Seen";

  @BelongsTo(() => User, { foreignKey: "userId" })
  user!: User;

  @BelongsTo(() => GroupChat, { foreignKey: "messageId" })
  message!: GroupChat;
}
