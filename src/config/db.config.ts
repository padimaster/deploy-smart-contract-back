import { registerAs } from '@nestjs/config';

/**
 * 
 * TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],

      # Database Settings
DB_TYPE=mysql
DB_ROOT_PASSWORD=root
DB_HOST=localhost
DB_NAME=test
DB_USER=root
DB_PASSWORD=root
DB_PORT=3306
    }),
 */
export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}));
