import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user";
import { Group } from "./group";
import { MessageStatus } from "./MessageStatus";

@Table({
  tableName: "Group_Chats",
  timestamps: true,
})
export class GroupChat extends Model {
  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  toGroupId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fromUserId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  sentAt!: Date;

  // Define hasMany relation with MessageStatus
  @HasMany(() => MessageStatus)
  messageStatus!: MessageStatus[];

  @BelongsTo(() => Group, { foreignKey: "toGroupId" })
  group!: Group;

  @BelongsTo(() => User, { foreignKey: "fromUserId" })
  user!: User;
}
