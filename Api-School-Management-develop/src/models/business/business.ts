import { BusinessI } from "dtos/businessDTO/businessDTO";
import { Table, PrimaryKey, DataType, Column, Model, Default } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: 'business',
})
export class Business extends Model<BusinessI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    businessPackageName!: string;

    @Column(DataType.STRING)
    userName!: string;
}