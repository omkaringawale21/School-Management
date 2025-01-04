import { AssetsI } from 'dtos/assetsDTO/assetsDTO';
import { Business } from '../business/business';
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
} from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'assets',
})
export class Assets extends Model<AssetsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    email!: string;

    @ForeignKey(() => Business)
    @Column(DataType.STRING)
    businessId!: string;
}
