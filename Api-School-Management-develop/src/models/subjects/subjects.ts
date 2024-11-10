import { SubjectsI } from "dtos/subjectsDTO/subjectsDTO";
import { Business } from "../business/business";
import { Table, Column, Model, Default, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "subjects"
})
export class Subjects extends Model<SubjectsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    subjectName!: string;

    @Column(DataType.ARRAY(DataType.UUID))
    teacherId!: string[];

    @ForeignKey(() => Business)
    @Column(DataType.UUID)
    businessId!: string;
}