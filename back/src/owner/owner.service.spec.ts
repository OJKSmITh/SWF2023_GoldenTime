import { Test, TestingModule } from '@nestjs/testing';
import { OwnerService } from './owner.service';
import { getModelToken } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

const mockOwnerModel = () => ({
  findAll: jest.fn(),
});
describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        {
          provide: getModelToken(Owner),
          useFactory: mockOwnerModel,
        },
      ],
    }).compile();

    service = module.get<OwnerService>(OwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
