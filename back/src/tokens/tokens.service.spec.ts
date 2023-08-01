import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './model/token.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuraction from '../config/configuraction';

describe('TokensService', () => {
  let service: TokensService;

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
      providers: [TokensService],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
