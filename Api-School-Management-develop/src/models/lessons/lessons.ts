import { LessonsI } from "dtos/lessonsDTO/lessonsDTO";
import { Business } from "../business/business";
import { Column, Table, Model, Default, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { Subjects } from "../subjects/subjects";
import { Classes } from "../classes/classes";

@Table({
    timestamps: true,
    tableName: "lessons"
})
export class Lessons extends Model<LessonsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => Subjects)
    @Column(DataType.UUID)
    subjectId!: string;

    @Column(DataType.STRING)
    subjectName!: string;

    @ForeignKey(() => Classes)
    @Column(DataType.UUID)
    classId!: string;

    @Column(DataType.STRING)
    className!: string;

    @Column(DataType.ARRAY(DataType.STRING))
    teachersName!: string[];

    @ForeignKey(() => Business)
    @Column(DataType.UUID)
    businessId!: string;
}