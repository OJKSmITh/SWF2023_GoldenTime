import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from './model/owner.model';

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner) private ownerModel: typeof Owner) {}

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.findAll();
  }

  create(createOwnerDto: CreateOwnerDto) {
    return this.ownerModel.create({ ...createOwnerDto });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} owner`;
  // }

  // update(id: number, updateOwnerDto: UpdateOwnerDto) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
