import { TeachersI } from "dtos/teachersDTO/teachersDTO";
import { Business } from "../business/business";
import { Column, Model, DataType, Table, PrimaryKey, Default, ForeignKey } from "sequelize-typescript";
import { Users } from "../users/users";
import { Classes } from "../classes/classes";
import { Years } from "../years/years";

@Table({
    timestamps: true,
    tableName: "teachers"
})
export class Teachers extends Model<TeachersI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    fullname?: string;

    @Column(DataType.STRING)
    username?: string;

    @Column(DataType.STRING)
    email?: string;

    @Column(DataType.INTEGER)
    phoneNumber?: number;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId?: string;

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