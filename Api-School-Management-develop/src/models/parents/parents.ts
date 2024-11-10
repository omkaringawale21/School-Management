import { ParentsI } from "dtos/parentsDTO/parentsDTO";
import { Business } from "../business/business";
import { Column, Table, Default, Model, PrimaryKey, DataType, ForeignKey } from "sequelize-typescript";
import { Students } from "../students/students";
import { Users } from "../users/users";

@Table({
    timestamps: true,
    tableName: "parents",
})
export class Parents extends Model<ParentsI> {
    @PrimaryKey
    @Default(() => DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    fullname!: string;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.INTEGER)
    phoneNumber!: number;

    @ForeignKey(() => Business)
    @Column(DataType.UUID)
    businessId!: string;

    @ForeignKey(() => Students)
    @Column(DataType.STRING)
    studentId!: string

    @ForeignKey(() => Users)
    @Column(DataType.STRING)
    userId!: string;
}