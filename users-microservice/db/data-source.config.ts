import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsTableName: 'migrations',
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
