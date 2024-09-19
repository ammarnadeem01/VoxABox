import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user";
import { GroupMember } from "./group_member";
import { GroupChat } from "./group_chat";

@Table({
  tableName: "Groups",
  timestamps: true,
})
export class Group extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  adminId!: string;

  @HasMany(() => GroupMember, { foreignKey: "groupId" })
  members!: GroupMember[];

  @HasMany(() => GroupChat, { foreignKey: "toGroupId" })
  groupChats!: GroupChat[];
}
