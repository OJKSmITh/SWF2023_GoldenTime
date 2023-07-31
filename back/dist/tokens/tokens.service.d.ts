import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './model/token.model';
export declare class TokensService {
    private tokenModel;
    constructor(tokenModel: typeof Token);
    findAll(): Promise<Token[]>;
    create(createTokenDto: CreateTokenDto): Promise<Token>;
}
