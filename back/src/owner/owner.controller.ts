import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}
  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Post()
  create(
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    createOwnerDto: CreateOwnerDto,
  ) {
    return this.ownerService.create(createOwnerDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ownerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
  //   return this.ownerService.update(+id, updateOwnerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ownerService.remove(+id);
  // }
}
