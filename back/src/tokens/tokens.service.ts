import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './model/token.model';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token) private tokenModel: typeof Token) {}

  async findAll(): Promise<Token[]> {
    return this.tokenModel.findAll();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} token`;
  // }

  async create(createTokenDto: CreateTokenDto) {
    return this.tokenModel.create({ ...createTokenDto });
  }

  // update(id: number, updateTokenDto: UpdateTokenDto) {
  //   return `This action updates a #${id} token`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} token`;
  // }
}
