import { UsersI } from "dtos/usersDTO/usersDTO";
import { Business } from "../business/business";
import { Table, Column, PrimaryKey, Default, Model, DataType, ForeignKey, HasMany, } from "sequelize-typescript";
import { Roles } from "../roles/roles";

@Table({
    timestamps: true,
    tableName: "users"
})
export class Users extends Model<UsersI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @ForeignKey(() => Roles)
    @Column(DataType.STRING)
    roleId!: string;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId!: string;
}