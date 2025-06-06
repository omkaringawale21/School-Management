import { TeacherInterface } from "../../dtos/teachersDTO/teachersDTO";
import { Business } from "../business/business";
import {
  Column,
  Model,
  DataType,
  Table,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Users } from "../users/users";

@Table({
  timestamps: true,
  tableName: "teachers",
})
export class Teachers extends Model<TeacherInterface> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  teacherName?: string;

  @Column(DataType.STRING)
  profileUrl?: string;

  @Column(DataType.STRING)
  teacherEmail?: string;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column(DataType.STRING)
  address?: string;

  @ForeignKey(() => Business)
  @Column(DataType.STRING)
  businessId!: string;

  @ForeignKey(() => Users)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => Business)
  business!: Business;

  @BelongsTo(() => Users)
  user!: Users;
}
