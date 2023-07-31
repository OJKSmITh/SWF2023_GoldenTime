declare const _default: () => {
    dev: {
        db: {
            dialect: string;
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
            autoLoadModels: boolean;
            synchronize: any;
        };
    };
    prod: {
        db: {
            dialect: string;
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
            autoLoadModels: boolean;
            synchronize: any;
        };
    };
};
export default _default;
