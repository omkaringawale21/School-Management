import { AssignmentsI } from "dtos/assignmentsDTO/assignmentsDTO";
import { Subjects } from "../subjects/subjects";
import { Table, Column, Model, Default, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { Classes } from "../classes/classes";
import { Teachers } from "../teachers/teachers";

@Table({
    timestamps: true,
    tableName: "assignments"
})
export class Assignments extends Model<AssignmentsI> {
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

    @Column(DataType.DATEONLY)
    dueDate!: string;
}