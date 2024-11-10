import { ActivitiesI } from "dtos/activitiesDTO/activitiesDTO";
import { Business } from "../business/business";
import { Users } from "../users/users";
import { Table, Column, Model, Default, DataType, PrimaryKey, ForeignKey} from "sequelize-typescript";
import { Students } from "../students/students";

@Table({
    timestamps: true,
    tableName: "activities"
})
export class Activities extends Model<ActivitiesI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    classId!: string;

    @Column(DataType.DATEONLY)
    date!: string;

    @ForeignKey(() => Business)
    @Column(DataType.UUID)
    businessId!: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    userId!: string;

    @ForeignKey(() => Students)
    @Column(DataType.UUID)
    studentId!: string;
}