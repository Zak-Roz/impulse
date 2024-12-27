import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const config = dotenv.parse(fs.readFileSync(path.resolve('./.env')));

let connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT ? +config.DB_PORT : 5432,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  logging: !config.DB_DISABLE_LOG,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  migrationsRun: false,
};

export default new DataSource({
  ...connectionOptions,
});
