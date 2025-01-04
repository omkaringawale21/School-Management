import { YearsI } from "dtos/yearsDTO/yearsDTO";
import { Column, Model, Table, PrimaryKey, Default, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "years"
})
export class Years extends Model<YearsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.INTEGER)
    year!: number;
}
