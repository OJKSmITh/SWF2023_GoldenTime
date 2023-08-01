import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { getModelToken } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

const mockOwnerModel = () => ({
  findAll: jest.fn(),
});

describe('OwnerController', () => {
  let controller: OwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [
        OwnerService,
        {
          provide: getModelToken(Owner),
          useFactory: mockOwnerModel,
        },
      ],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
