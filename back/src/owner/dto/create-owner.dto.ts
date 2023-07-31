import { MinLength, IsEnum, IsString } from 'class-validator';

export enum ownerEnum {
  'ambulance',
  'hospital',
}

export class CreateOwnerDto {
  @IsString()
  @IsEnum(ownerEnum)
  owner: string;

  @IsString()
  @MinLength(42, { message: 'account의 길이는 최소 42여야 합니다.' })
  account: string;
}
