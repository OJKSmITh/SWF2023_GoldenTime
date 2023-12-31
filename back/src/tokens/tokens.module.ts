import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './model/token.model';

@Module({
  imports: [SequelizeModule.forFeature([Token])],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
