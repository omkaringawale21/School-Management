import { ClassesI } from "dtos/classesDTO/classesDTO";
import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "classes"
})
export class Classes extends Model<ClassesI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    classDiv!: string;

    @Column(DataType.STRING)
    classStandard!: string;

    @Column(DataType.STRING)
    classIntake!: string;

    @Column(DataType.STRING)
    classSupervisor!: string;
}