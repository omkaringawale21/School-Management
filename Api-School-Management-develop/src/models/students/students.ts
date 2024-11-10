import { StudentsI } from "dtos/studentsDTO/studentsDTO";
import { Business } from "../business/business";
import { Column, Table, PrimaryKey, DataType, Model, Default, ForeignKey } from "sequelize-typescript";
import { Parents } from "../parents/parents";
import { Users } from "../users/users";
import { Classes } from "../classes/classes";
import { Years } from "../years/years";

@Table({
    timestamps: true,
    tableName: "students",
})
export class Students extends Model<StudentsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id?: string;

    @Column(DataType.UUID)
    fullname?: string;

    @Column(DataType.UUID)
    username?: string;

    @Column(DataType.UUID)
    email?: string;

    @Column(DataType.INTEGER)
    phoneNumber?: number;

    @ForeignKey(() => Business)
    @Column(DataType.UUID)
    businessId?: string;

    @ForeignKey(() => Parents)
    @Column(DataType.UUID)
    parentId?: string;

    @ForeignKey(() => Users)
    @Column(DataType.STRING)
    userId!: string;

    @ForeignKey(() => Classes)
    @Column(DataType.ARRAY(DataType.UUID))
    classId!: string[];

    @ForeignKey(() => Years)
    @Column(DataType.ARRAY(DataType.UUID))
    yearId!: string[];
}