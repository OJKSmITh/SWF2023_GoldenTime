import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './model/owner.model';
export declare class OwnerService {
    private ownerModel;
    constructor(ownerModel: typeof Owner);
    findAll(): Promise<Owner[]>;
    create(createOwnerDto: CreateOwnerDto): Promise<Owner>;
}
