import {DataSource, DataSourceOptions } from 'typeorm';

import config from './config';


const {
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD
} = config

export const database = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: ['{src,build}/**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,  
})