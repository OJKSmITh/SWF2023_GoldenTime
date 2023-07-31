"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    dev: {
        db: {
            dialect: 'mysql',
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '1',
            database: process.env.DB_NAME || 'test',
            autoLoadModels: true,
            synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
        },
    },
    prod: {
        db: {
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadModels: true,
            synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
        },
    },
});
//# sourceMappingURL=configuraction.js.map