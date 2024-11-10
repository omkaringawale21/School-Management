import { AttendancesI } from "dtos/attendancesDTO/attendancesDTO";
import { Students } from "../students/students";
import { Years } from "../years/years";
import { Table, Column, Model, Default, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "attendances"
})
export class Attendances extends Model<AttendancesI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id?: string;

    @Column(DataType.STRING)
    studentName!: string;

    @ForeignKey(() => Students)
    @Column(DataType.UUID)
    studentId!: string;

    @Column(DataType.INTEGER)
    year!: number;

    @ForeignKey(() => Years)
    @Column(DataType.UUID)
    yearId!: string;

    @Column(DataType.INTEGER)
    totalDays!: number;

    @Column(DataType.INTEGER)
    activeDays!: number;

    @Column(DataType.INTEGER)
    presentDays!: number;

    @Column(DataType.INTEGER)
    absentDays!: number;
}