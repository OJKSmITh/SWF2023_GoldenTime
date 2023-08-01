import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    findAll(): Promise<import("./model/token.model").Token[]>;
    create(createTokenDto: CreateTokenDto): Promise<import("./model/token.model").Token>;
}
