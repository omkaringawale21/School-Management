import { SubjectsI } from "dtos/subjectsDTO/subjectsDTO";
import { Business } from "../business/business";
import { Teachers } from "../teachers/teachers";
import {
  Table,
  Column,
  Model,
  Default,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "subjects",
})
export class Subjects extends Model<SubjectsI> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  subjectName!: string;

  @ForeignKey(() => Teachers)
  @Column(DataType.ARRAY(DataType.UUID))
  teacherId!: string[];

  @ForeignKey(() => Business)
  @Column(DataType.UUID)
  businessId!: string;

  // @BelongsTo(() => Business)
  // business!: Business;
}
