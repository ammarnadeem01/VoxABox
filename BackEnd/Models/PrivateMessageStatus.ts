import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { PrivateChat } from "./private_chat";

@Table({
  tableName: "PrivateMessageStatus",
  timestamps: true,
})
export class PrivateMessageStatus extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => PrivateChat)
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

  @BelongsTo(() => User, { foreignKey: "userId" })
  user!: User;

  @BelongsTo(() => PrivateChat, {
    foreignKey: "messageId",
    onDelete: "CASCADE",
  })
  message!: PrivateChat;
}
