import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { getModelToken } from '@nestjs/sequelize';
import { Token } from './model/token.model';

const mockTokenModel = () => ({
  findAll: jest.fn(),
});

describe('TokensService', () => {
  let service: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,
        {
          provide: getModelToken(Token),
          useFactory: mockTokenModel,
        },
      ],
    }).compile();

    service = module.get<TokensService>(TokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
