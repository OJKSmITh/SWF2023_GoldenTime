import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuraction from '../config/configuraction';

describe('OwnerService', () => {
  let service: OwnerService;

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
        SequelizeModule.forFeature([Owner]),
      ],
      providers: [OwnerService],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
