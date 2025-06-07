import { ClassesI } from "dtos/classesDTO/classesDTO";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Business } from "../business/business";

@Table({
  timestamps: true,
  tableName: "classes",
})
export class Classes extends Model<ClassesI> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  className!: string;

  @Column(DataType.STRING)
  classCapacity!: string;

  @Column(DataType.STRING)
  classGrade!: string;

  @Column(DataType.STRING)
  classSupervisor!: string;

  @ForeignKey(() => Business)
  @Column(DataType.UUID)
  businessId!: string;

//   @BelongsTo(() => Business)
//   business!: Business;
}
