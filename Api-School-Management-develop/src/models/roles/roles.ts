import { RolesI } from "dtos/rolesDTO/rolesDTO";
import { Table, Model, Column, PrimaryKey, DataType, Default } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "roles"
})
export class Roles extends Model <RolesI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    roleName!: string;
}