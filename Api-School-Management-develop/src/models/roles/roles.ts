import { RolesI } from "dtos/rolesDTO/rolesDTO";
import { Table, Model, Column, PrimaryKey, DataType, Default, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Business } from "../business/business";

@Table({
    timestamps: true,
    tableName: "roles"
})
export class Roles extends Model <RolesI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    roleName!: string;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId!: string;

    @BelongsTo(() => Business)
    business!: Business;
}