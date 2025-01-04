import { ResultsI } from "dtos/resultsDTO/resultsDTO";
import { Subjects } from "../subjects/subjects";
import { Table, Column, Model, PrimaryKey, ForeignKey, Default, DataType } from "sequelize-typescript";
import { Classes } from "../classes/classes";
import { Teachers } from "../teachers/teachers";
import { Students } from "../students/students";

@Table({
    timestamps: true,
    tableName: "results"
})
export class Results extends Model<ResultsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    subjectName!: string;

    @ForeignKey(() => Subjects)
    @Column(DataType.UUID)
    subjectId!: string;

    @Column(DataType.STRING)
    className!: string;

    @ForeignKey(() => Classes)
    @Column(DataType.UUID)
    classId!: string;

    @Column(DataType.STRING)
    teacherName!: string;

    @ForeignKey(() => Teachers)
    @Column(DataType.UUID)
    teacherId!: string;

    @Column(DataType.STRING)
    studentName!: string;

    @ForeignKey(() => Students)
    @Column(DataType.UUID)
    studentId!: string;

    @Column(DataType.DATEONLY)
    resultDate!: string;

    @Column(DataType.STRING)
    resultType!: string;
}