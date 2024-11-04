import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import pushConfig from './config/push.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import databaseConfig from './config/db.config';
import { Course } from './courses/entities/course.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [pushConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: dbConfig.type as 'mysql' | 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        database: dbConfig.database,
        username: dbConfig.username,
        password: dbConfig.password,
        entities: [Course],
        synchronize: true,
      }),
      inject: [databaseConfig.KEY],
    }),
    EventEmitterModule.forRoot(),
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
