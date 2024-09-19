import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user";
import { Group } from "./group";

@Table({
  tableName: "Group_Members",
  timestamps: true,
})
export class GroupMember extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  memberId!: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId!: number;

  @Column({
    type: DataType.ENUM("Admin", "Regular"),
    defaultValue: "Regular",
    allowNull: false,
  })
  role!: "Admin" | "Regular";

  @Column({
    type: DataType.ENUM("Left", "Pending", "Accepted"),
    allowNull: false,
    defaultValue: "Pending",
  })
  membershipStatus!: "Left" | "Pending" | "Accepted";

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  joinedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  clearedAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  leftAt!: Date;

  @BelongsTo(() => User, { foreignKey: "memberId" })
  member!: User;

  @BelongsTo(() => Group, { foreignKey: "groupId", as: "group" })
  group!: Group;
}
