import { UsersI } from "dtos/usersDTO/usersDTO";
import { Business } from "../business/business";
import { Table, Column, PrimaryKey, Default, Model, DataType, ForeignKey, } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "users"
})
export class Users extends Model<UsersI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId!: string;
}