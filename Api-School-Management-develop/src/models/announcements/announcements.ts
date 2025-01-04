import { AnnouncementsI } from "dtos/announcementsDTO/announcementsDTO";
import { Classes } from "../classes/classes";
import { Column, Table, Model, DataType, PrimaryKey, ForeignKey, Default } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "announcements"
})
export class Announcements extends Model<AnnouncementsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.STRING)
    id!: string;

    @Column(DataType.STRING)
    announcementTitle!: string;

    @Column(DataType.STRING)
    announcementClass!: string;

    @Column(DataType.DATEONLY)
    announcementDate!: string;

    @ForeignKey(() => Classes)
    @Column(DataType.UUID)
    classId!: string;
}