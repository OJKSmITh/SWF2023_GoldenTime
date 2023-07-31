import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1',
          database: 'test',
          autoLoadModels: true,
          synchronize: true,
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
