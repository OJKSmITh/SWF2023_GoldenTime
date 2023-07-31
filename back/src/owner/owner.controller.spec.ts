import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

describe('OwnerController', () => {
  let controller: OwnerController;

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
      controllers: [OwnerController],
      providers: [OwnerService],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
