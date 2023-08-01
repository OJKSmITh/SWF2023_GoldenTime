import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './model/token.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuraction from '../config/configuraction';

describe('TokensController', () => {
  let controller: TokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        SequelizeModule.forFeature([Token]),
      ],
      controllers: [TokensController],
      providers: [TokensService],
    }).compile();

    controller = module.get<TokensController>(TokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
