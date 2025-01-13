import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresProviderModule } from './providers/database/postgres/provider.module';
import { JwtProviderModule } from './providers/jwt/provider.module';
import { AppConfigModule } from './config/app/app.module';
import { UsersModule } from './models/users/users.module';
import { LoggerMiddleware } from './common/middlewares';
import { AuthModule } from './authentication/auth.module';
import { NotesModule } from './models/notes/notes.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresProviderModule,
    JwtProviderModule,
    AuthModule,
    UsersModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
