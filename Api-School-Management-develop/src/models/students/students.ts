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
import { StudentInterface } from "../../dtos/studentsDTO/studentsDTO";

@Table({
  timestamps: true,
  tableName: "students",
})
export class Students extends Model<StudentInterface> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  studentName?: string;

  @Column(DataType.STRING)
  profileUrl?: string;

  @Column(DataType.STRING)
  studentEmail?: string;

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
