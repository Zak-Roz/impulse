import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { DATABASE_PROVIDE_NAME } from '../../resources/common/constants';

export const databaseProvider = {
  provide: DATABASE_PROVIDE_NAME,
  useFactory: async (configService: ConfigService) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      logging: !configService.get('DB_DISABLE_LOG'),
      entities: ["dist/**/*.entity{.ts,.js}"],
    });
    return dataSource.initialize();
  },
  inject: [ConfigService]
};
