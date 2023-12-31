import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import envSchema from './configs/validation-schema';
import { UserModule } from './modules/user/user.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { GrammarModule } from './modules/grammar/grammar.module';
import { ListeningModule } from './modules/listening/listening.module';
import { ReadingModule } from './modules/reading/reading.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserLearningModule } from './modules/user-learning/user-learning.module';
import { APP_FILTER } from '@nestjs/core';
import { InternalServerErrorFilter } from './commons/exeptions/exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envSchema,
    }),
    MongooseModule.forRoot(process.env.URL_MONGOOSE),
    UserModule,
    LessonModule,
    GrammarModule,
    ListeningModule,
    ReadingModule,
    AuthModule,
    UserLearningModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
  ],
})
export class AppModule {}
