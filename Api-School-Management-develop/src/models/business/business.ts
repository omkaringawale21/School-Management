import { BusinessI } from "dtos/businessDTO/businessDTO";
import { Teachers } from "../../models/teachers/teachers";
import { Users } from "../../models/users/users"
import {
  Table,
  PrimaryKey,
  DataType,
  Column,
  Model,
  Default,
  HasMany,
} from "sequelize-typescript";
import { Roles } from "../../models/roles/roles";

@Table({
  timestamps: true,
  tableName: "business",
})
export class Business extends Model<BusinessI> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  businessPackageName!: string;

  @Column(DataType.STRING)
  userName!: string;

  @HasMany(() => Users)
  user!: Business;

  @HasMany(() => Teachers)
  teachers!: Teachers;

  @HasMany(() => Roles)
  roles!: Roles;
}
