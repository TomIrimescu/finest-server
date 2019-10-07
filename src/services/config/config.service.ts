import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { join } from 'path';

@Injectable()
export class ConfigService {
    PORT: number;
    private readonly envConfig: { [key: string]: string };

    constructor() {
        if (
            process.env.NODE_ENV === 'production' ||
            process.env.NODE_ENV === 'staging'
        ) {
            this.envConfig = {
                PORT: process.env.PORT,
            };
        } else {
            this.envConfig = dotenv.parse(fs.readFileSync(join(__dirname, '../../../.env')));
        }
    }

    get(key: string): string {
        return this.envConfig[key]
        ? this.envConfig[key]
        : process.env[key];
    }
}
