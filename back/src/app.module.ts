import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuraction from './config/configuraction';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthController } from './health/health.controller';
import { TokensModule } from './tokens/tokens.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuraction],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const mode = process.env.MODE;
        const { db } = config.get(mode);
        return {
          dialect: db.dialect,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          autoLoadModels: db.autoLoadModels,
          synchronize: db.synchronize,
        };
      },
    }),
    TokensModule,
    OwnerModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
