import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoursesModule } from './courses/courses.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Course } from './courses/entities/course.entity';
import config from './config/config';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(config)],
      useFactory: (configuration: ConfigType<typeof config>) => ({
        type: configuration.db.type as 'mysql' | 'postgres',
        host: configuration.db.host,
        port: configuration.db.port,
        database: configuration.db.database,
        username: configuration.db.username,
        password: configuration.db.password,
        entities: [Course],
        synchronize: true,
      }),
      inject: [config.KEY],
    }),
    EventEmitterModule.forRoot(),
    CoursesModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
