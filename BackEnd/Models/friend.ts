import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";

@Table({
  tableName: "Friends",
  timestamps: true,
})
export class Friend extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  friendId!: string;

  @Column({
    type: DataType.ENUM("Pending", "Blocked", "Accepted"),
    defaultValue: "Pending",
  })
  status!: "Pending" | "Blocked" | "Accepted";

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  clearedAt!: Date;

  @BelongsTo(() => User, { foreignKey: "userId", as: "user" })
  user!: User;

  @BelongsTo(() => User, { foreignKey: "friendId", as: "friend" })
  friend!: User;
}
Friend.belongsTo(User, { as: "clearedBy", foreignKey: "clearedById" });
