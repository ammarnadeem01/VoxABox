import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  tableName: "Private_Chats",
  timestamps: true,
})
export class PrivateChat extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fromUserId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  toUserId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.ENUM("Seen", "Not Seen"),
    allowNull: false,
    defaultValue: "Not Seen",
  })
  seenStatus!: "Seen" | "Not Seen";

  @BelongsTo(() => User, { foreignKey: "fromUserId" })
  fromUser!: User;

  @BelongsTo(() => User, { foreignKey: "toUserId" })
  toUser!: User;
}
