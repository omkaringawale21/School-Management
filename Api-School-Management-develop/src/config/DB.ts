import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { Assets } from '../models/assets/assets';
import { Business } from '../models/business/business';
import { Parents } from '../models/parents/parents';
import { Students } from '../models/students/students';
import { Teachers } from '../models/teachers/teachers';
import { Roles } from '../models/roles/roles';
import { Users } from '../models/users/users';
import { Years } from '../models/years/years';
import { Classes } from '../models/classes/classes';
import { Activities } from '../models/activities/activities';
import { Exams } from '../models/exams/exams';
import { Subjects } from '../models/subjects/subjects';
import { Lessons } from '../models/lessons/lessons';
import { Assignments } from '../models/assignments/assignments';
import { Results } from '../models/results/results';
import { Attendances } from '../models/attendances/attendances';
import { Events } from '../models/events/events';
import { Announcements } from '../models/announcements/announcements';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: String(process.env.DB_USERNAME) as string,
    password: String(process.env.DB_PASSWORD) as string,
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    models: [Assets, Business, Parents, Students, Teachers, Roles, Users, Years, Classes, Activities, Exams, Subjects, Lessons, Assignments, Results, Attendances, Events, Announcements],
    logging: false
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default initializeDatabase;
