import { EventsI } from "dtos/eventsDTO/eventsDTO";
import { Classes } from "../classes/classes";
import { Table, Column, Model, Default, DataType, PrimaryKey, ForeignKey } from "sequelize-typescript"

@Table({
    timestamps: true,
    tableName: "events"
})
export class Events extends Model<EventsI> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id?: string;

    @Column(DataType.STRING)
    eventTitle!: string;

    @Column(DataType.STRING)
    className!: string;

    @ForeignKey(() => Classes)
    @Column(DataType.UUID)
    classId!: string;

    @Column(DataType.DATEONLY)
    eventDate!: string;

    @Column(DataType.DATEONLY)
    startTime!: string;

    @Column(DataType.DATEONLY)
    endTime!: string;
}