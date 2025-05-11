import { ParentsInterface } from "dtos/parentsDTO/parentsDTO";
import { Business } from "../business/business";
import {
  Column,
  Table,
  Default,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Students } from "../students/students";
import { Users } from "../users/users";

@Table({
  timestamps: true,
  tableName: "parents",
})
export class Parents extends Model<ParentsInterface> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  parentname?: string;

  @Column(DataType.STRING)
  email?: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @ForeignKey(() => Business)
  @Column(DataType.STRING)
  businessId!: string;

  @ForeignKey(() => Students)
  @Column(DataType.STRING)
  studentId!: string;

  @ForeignKey(() => Users)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => Business)
  business!: Business;

  @BelongsTo(() => Users)
  user!: Users;

  @BelongsTo(() => Students)
  students!: Users;
}
