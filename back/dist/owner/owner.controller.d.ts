import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
export declare class OwnerController {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    findAll(): Promise<import("./model/owner.model").Owner[]>;
    create(createOwnerDto: CreateOwnerDto): Promise<import("./model/owner.model").Owner>;
}
