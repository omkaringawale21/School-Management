import { ExamsI } from "dtos/examsDTO/examsDTO";
import { Business } from "../business/business";
import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, Default } from "sequelize-typescript";
import { Subjects } from "../subjects/subjects";

@Table({
    timestamps: true,
    tableName: "exams"
})
export class Exams extends Model<ExamsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => Subjects)
    @Column(DataType.STRING)
    subjectId!: string;

    @Column(DataType.STRING)
    classId!: string;

    @Column(DataType.STRING)
    teacherId!: string;

    @Column(DataType.DATEONLY)
    date!: string;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId!: string;
}